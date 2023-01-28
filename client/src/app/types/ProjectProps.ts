import { TimeRegistration } from './TimeRegistration';
export type ProjectProps = {
    id: number;
    name: string;
    description: string;
    client: string;
    contributorName: string;
    timeSpent: number;
    startDate: Date;
    endDate: Date;
    completed: boolean;
    timeRegistrations: TimeRegistration[];
}

