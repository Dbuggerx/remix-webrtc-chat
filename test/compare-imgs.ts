import * as fs from "fs";
import * as path from "path";
import { PNG } from "pngjs";
import pixelmatch from "pixelmatch";
import testcafeConfig from "../.testcaferc.base.cjs";

const paths = {
  diffs: path.join(testcafeConfig.screenshots.path, "diffs"),
  base: path.join(testcafeConfig.screenshots.path, "base"),
  latest: path.join(testcafeConfig.screenshots.path, "latest"),
};

export function getVrtConfig(isApprovingVRTs: boolean) {
  return {
    disableScreenshots: false,
    screenshots: {
      pathPattern: `${isApprovingVRTs ? "base" : "latest"}/${testcafeConfig.screenshots.pathPattern}`,
    },
  };
}

export async function compareScreenshots() {
  if (fs.existsSync(paths.diffs)) clearDir(paths.diffs);
  else fs.mkdirSync(paths.diffs, { recursive: true });
  const results = await Promise.all(
    getScreenshotsPaths().map((screenshotPaths) =>
      compareImgs(...screenshotPaths),
    ),
  );
  if (results.some((r) => !!r)) {
    console.table(results.filter(Boolean));
    throw new Error("Visual regression errors were found");
  }
}

async function compareImgs(imgPath1: string, imgPath2: string) {
  console.log(`Comparing image: "${path.basename(imgPath1)}"`);
  const { mismatchedPixels, diff } = await getMistachedPixels(
    imgPath1,
    imgPath2,
  );

  if (mismatchedPixels === 0) return null;

  return handleMismatchError(imgPath1, diff, mismatchedPixels);
}

async function getMistachedPixels(imgPath1: string, imgPath2: string) {
  const imgs = await Promise.all([getPngData(imgPath1), getPngData(imgPath2)]);
  const diff = new PNG({ width: imgs[0].width, height: imgs[0].height });
  const mismatchedPixels = pixelmatch(
    imgs[0].data,
    imgs[1].data,
    diff.data,
    imgs[0].width,
    imgs[0].height,
    {
      threshold: 0.3,
    },
  );
  return { mismatchedPixels, diff };
}

function getPngData(imgPath: string): Promise<PNG> {
  return new Promise((resolve, reject) => {
    fs.createReadStream(imgPath)
      .on("error", reject)
      .pipe(new PNG())
      .on("parsed", function parsed() {
        resolve(this);
      });
  });
}

function handleMismatchError(
  imgPath: string,
  diff: PNG,
  mismatchedPixels: number,
) {
  const imgFileName = path.basename(imgPath);
  const browserDir = path.basename(path.dirname(imgPath));
  if (!fs.existsSync(path.join(paths.diffs, browserDir)))
    fs.mkdirSync(path.join(paths.diffs, browserDir), { recursive: true });

  return new Promise<{
    imgFileName: string;
    mismatchedPixels: number;
  }>((resolve) => {
    const writableStream = fs.createWriteStream(
      path.join(paths.diffs, browserDir, imgFileName),
    );

    diff.pack().pipe(writableStream);

    writableStream.once("close", () =>
      resolve({
        imgFileName,
        mismatchedPixels,
      }),
    );
  });
}

function clearDir(dirPath: string) {
  fs.readdirSync(dirPath).forEach((cur) => {
    const joinedPath = path.join(dirPath, cur);
    if (fs.statSync(joinedPath).isDirectory()) {
      clearDir(joinedPath);
      fs.rmdirSync(joinedPath);
    } else fs.unlinkSync(joinedPath);
  });
}

type ImgPaths = [string, string][];

function getScreenshotsPaths() {
  if (!fs.existsSync(paths.latest))
    fs.mkdirSync(paths.latest, { recursive: true });
  return fs
    .readdirSync(paths.latest)
    .reduce<ImgPaths>(
      (acc, browserDir) =>
        acc.concat(
          getFileNamesFromDir(path.join(paths.latest, browserDir)).map(
            (fileName) => [
              path.join(paths.base, browserDir, fileName),
              path.join(paths.latest, browserDir, fileName),
            ],
          ),
        ),
      [],
    );
}

function getFileNamesFromDir(dir: string) {
  return fs
    .readdirSync(dir)
    .filter((p) => !fs.statSync(path.join(dir, p)).isDirectory());
}
