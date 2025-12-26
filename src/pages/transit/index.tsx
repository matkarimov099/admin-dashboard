import {lazy} from 'react';
import {LazyComponent} from '@/components/common/lazy-component.tsx';
import {Card} from "@/components/ui/card.tsx";

// Lazy load the heavy tasks table component
const TransitTable = lazy(() => import('@/features/transit/components/TransitAtTable'));

const TransitAtTable = () => {
    return (
        <Card className={"border p-4 mt-2 shadow-lg"}>
            <LazyComponent>
                <TransitTable/>
            </LazyComponent>
        </Card>
    );
};

export default TransitAtTable;
