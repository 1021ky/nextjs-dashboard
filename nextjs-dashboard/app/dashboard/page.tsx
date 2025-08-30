import { Card } from '@/app/ui/dashboard/cards';
import RevenueChart from '@/app/ui/dashboard/revenue-chart';
import LatestInvoices from '@/app/ui/dashboard/latest-invoices';
import { lusitana } from '@/app/ui/fonts';
import { fetchRevenue, fetchLatestInvoices, fetchCardData } from '@/app/lib/data';


export default async function Page() {
    // 一部データが取得できないことを許容する
    const [revRes, invRes, cardRes] = await Promise.allSettled([
        fetchRevenue(),
        fetchLatestInvoices(),
        fetchCardData(),
    ]);

    const revenue = revRes.status === 'fulfilled' ? revRes.value : [];
    const latestInvoices = invRes.status === 'fulfilled' ? invRes.value : [];
    const {
        numberOfInvoices,
        numberOfCustomers,
        totalPaidInvoices,
        totalPendingInvoices,
    } =
        cardRes.status === 'fulfilled'
            ? cardRes.value
            : { numberOfInvoices: 0, numberOfCustomers: 0, totalPaidInvoices: '$0', totalPendingInvoices: '$0' };

    return (
        <main>
            <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
                Dashboard
            </h1>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <Card title="Collected" value={totalPaidInvoices} type="collected" />
                <Card title="Pending" value={totalPendingInvoices} type="pending" />
                <Card title="Total Invoices" value={numberOfInvoices} type="invoices" />
                <Card title="Total Customers" value={numberOfCustomers} type="customers" />
            </div>
            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
                <RevenueChart revenue={revenue} />
                <LatestInvoices latestInvoices={latestInvoices} />
            </div>
        </main>
    );
}