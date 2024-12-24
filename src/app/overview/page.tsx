import OverviewTable from "@/components/overview/overview.table";

const OverviewPage = async (props: any) => {
    const LIMIT = 5;
    const page = props?.searchParams?.page ?? 1;

    const res = await fetch(
        `https://prod-api.doctornetwork.us/v1/videos?sort=-created_at&limit=${LIMIT}&offset=0&fq=is_deleted:0`,
        {
            method: "GET",
            next: { tags: ['list-users'] }
        }
    );
    const total_items = +(res.headers?.get("X-Total-Count") ?? 0)
    const data = await res.json();

    return (
        <div>
            <OverviewTable
                users={data ? data : []}
            />
        </div>
    )
}

export default OverviewPage;