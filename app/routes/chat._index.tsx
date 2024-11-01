export default function ChatIndex() {
  return (
    <article className="overflow-auto">
      <header className="mb-6">
        <h1 className="text-2xl">Remix WebRTC Chat</h1>
        <p className="text-slate-600 dark:text-muted-foreground">
          A real-time peer-to-peer messaging
          application built with modern web technologies.
        </p>
      </header>
      <section>
        <strong>Key Features</strong>
        <ul className="my-4 list-disc pl-8">
          <li>Real-time P2P messaging with WebRTC</li>
          <li>Responsive UI styled with TailwindCSS and Radix-UI</li>
          <li>Dark mode support</li>
          <li>Built with Remix and React</li>
        </ul>
      </section>
      <section>
        <strong>Technologies Used</strong>
        <ul className="my-4 list-disc pl-8">
          <li>
            <strong>Remix:</strong> Modern web framework for routing and state
            management
          </li>
          <li>
            <strong>React:</strong> JavaScript library for building interactive
            UIs
          </li>
          <li>
            <strong>WebRTC (PeerJS):</strong> Simplifies peer-to-peer
            communication
          </li>
          <li>
            <strong>Shadcn (TailwindCSS + Radix-UI):</strong> Utility-first
            styling with accessible components
          </li>
          <li>
            <strong>Pnpm:</strong> Fast package manager for JavaScript projects
          </li>
        </ul>

        <strong>Learn More</strong>
        <ul className="my-4 list-disc pl-8">
          <li>
            <a
              className="text-blue-800 dark:text-blue-300 decoration-2 opacity-90 hover:text-blue-300 hover:underline focus:underline focus:outline-none"
              href="https://remix.run/docs"
            >
              Remix Docs
            </a>
          </li>
          <li>
            <a
              className="text-blue-800 dark:text-blue-300 decoration-2 opacity-90 hover:text-blue-500 hover:underline focus:underline focus:outline-none"
              href="https://github.com/Dbuggerx/remix-webrtc-chat"
            >
              GitHub Repository
            </a>
          </li>
        </ul>
      </section>
    </article>
  );
}
