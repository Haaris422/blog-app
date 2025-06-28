import { ApplicationCard } from "./ApplicationCard";

export function AdminApplications({ applications }: { applications: AuthorApplicationForm[] }) {
    return (
        <div className="px-4 py-10 mt-8 xs:px-8 bg-black lg:px-20 ">
            <h1 className="text-4xl mb-6">Applications</h1>
            <div className="flex gap-8 flex-wrap">
                {applications.map((app) => (
                    <ApplicationCard key={app.id} application={app} />
                ))}
            </div>
        </div>
    )
}