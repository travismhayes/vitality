import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import HeatMap  from '@/Components/HeatMap'

export default function Dashboard(props) {
    return (
        <AuthenticatedLayout
            auth={props.auth}
            errors={props.errors}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Dashboard</h2>}
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 dark:text-gray-200 shadow-sm sm:rounded-lg p-4">
                        <h1 ><strong>Vitality Stats</strong></h1>
                        <br/>
                        <p>12 activities in the past year. Current streak: <strong>2 days.</strong></p>
                        <br/>
                        <HeatMap />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
