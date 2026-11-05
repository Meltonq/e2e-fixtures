import { prisma } from '../lib/prisma';

// Rendered per request: the build has no database, the running server has.
export const dynamic = 'force-dynamic';

async function checkDatabase() {
    try {
        await prisma.visit.create({ data: {} });
        const visits = await prisma.visit.count();

        return `ok visits=${visits}`;
    } catch (error) {
        return `fail (${error.message.split('\n').filter(Boolean).pop()})`;
    }
}

export default async function Home() {
    const db = await checkDatabase();
    // A failed check answers 500 (and is logged) instead of passing quietly.
    if (!db.startsWith('ok')) {
        throw new Error(`e2e:next-prisma database check failed: ${db}`);
    }

    return <pre>{`e2e:next-prisma:v1 db=${db}`}</pre>;
}
