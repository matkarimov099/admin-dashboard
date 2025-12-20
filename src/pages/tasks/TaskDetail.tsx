import { ArrowLeftIcon } from 'lucide-react';
import { useNavigate } from 'react-router';
import { Button } from '@/components/ui/button.tsx';

export default function TaskDetail() {
  const navigate = useNavigate();
  const handleBack = () => navigate(-1);
  return (
    <div className="mb-4 flex items-center gap-2">
      <Button variant="ghost" onClick={handleBack}>
        <ArrowLeftIcon className="h-5 w-5" />
      </Button>
      <h1 className="font-semibold text-xl">Task Details</h1>
    </div>
  );
}
