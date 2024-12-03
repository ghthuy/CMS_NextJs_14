import UsersTable from "@/components/users/users.table";

const UsersPage = async (props: any) => {
    const LIMIT = 5;
    const page = props?.searchParams?.page ?? 1;

    const res = await fetch(
        `https://prod-api.doctornetwork.us/v1/videos?sort=-created_at&limit=${LIMIT}&offset=0&fq=is_deleted:0`,
        {
            method: "GET",
            next: { tags: ['list-users'] }
        }

        //https://prod-api.doctornetwork.us/v1/videos?sort=-created_at&limit=${LIMIT}&offset=0&fq=is_deleted:0
        //`http://localhost:8000/users?_page=${page}&_limit=${LIMIT}`,
    );
    const total_items = +(res.headers?.get("X-Total-Count") ?? 0)
    const data = await res.json();

    console.log("data", data);

    return (
        <div>
            <UsersTable
                users={data ? data : []}
                meta={
                    {
                        current: +page,
                        pageSize: LIMIT,
                        total: total_items
                    }
                }
            />
        </div>
    )
}

export default UsersPage;