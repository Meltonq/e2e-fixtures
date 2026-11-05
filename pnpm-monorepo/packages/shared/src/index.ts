/**
 * The marker lives in a workspace package that only exists as JavaScript after its
 * build, so apps/web answers only when the workspaces were built in order.
 */
export function marker(version: string): string {
    return `e2e:pnpm-monorepo:${version}`;
}
