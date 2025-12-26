import {lazy} from 'react';
import {LazyComponent} from '@/components/common/lazy-component.tsx';
import {Card} from "@/components/ui/card.tsx";

// Lazy load the heavy users table component
const UsersTable = lazy(() => import('@/features/users/components/UsersTable.tsx'));

const Users = () => {
    return (
        <Card className={"border p-4 mt-2"}>
            {/* DataTable with custom configuration */}
            <LazyComponent>
                <UsersTable/>
            </LazyComponent>
        </Card>
    );
};

export default Users;
