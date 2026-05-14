import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createMDX } from 'fumadocs-mdx/next';

const docsDirectory = dirname(fileURLToPath(import.meta.url));
const workspaceRoot = join(docsDirectory, '..');

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  turbopack: {
    root: workspaceRoot,
  },
  transpilePackages: ['@workspace/ui'],
};

const withMDX = createMDX();

export default withMDX(config);
