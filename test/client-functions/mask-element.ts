import { ClientFunction } from "testcafe";

export default ClientFunction((element: NodeSnapshot) => {
  const rect = element.boundingClientRect;
  if (!rect) throw new Error("No element.boundingClientRect!");

  const mask = document.createElement("div");
  mask.className = "vrt-mask";
  mask.style.position = "absolute";
  mask.style.top = `${rect.top}px`;
  mask.style.left = `${rect.left}px`;
  mask.style.width = `${rect.width}px`;
  mask.style.height = `${rect.height}px`;
  mask.style.backgroundColor = "rgba(255, 105, 180, 1)";
  mask.style.zIndex = "9999";
  mask.style.display = 'flex';
  mask.style.justifyContent = 'center';
  mask.style.alignItems = 'center';
  mask.textContent = 'masked';

  document.body.appendChild(mask);

  // Add event listener to remove the mask when clicked
  mask.addEventListener("click", () => {
    document.body.removeChild(mask);
  });
});
