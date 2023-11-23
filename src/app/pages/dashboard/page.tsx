import { getClient } from "@/prisma/getClient";
import { revalidatePath } from "next/cache";

const client = getClient();
const filter = {
  count: 5,
  page: 1,
  sortBy: "desc" as "desc" | "asc"
};

export default async function Dashboard() {
  const users = await client.user.findMany({
    orderBy: {
      createdAt: filter.sortBy
    },
    skip: filter.count * (filter.page - 1),
    take: filter.count
  });

  const submit = async (data: FormData) => {
    "use server";
    const username = data.get("username");
    if (typeof username === "string" && username) {
      await client.user.create({
        data: {
          username
        }
      });
      revalidatePath("/pages/dashboard");
    }
  };

  const changeFilter = async (data: FormData) => {
    "use server";
    const sortBy = data.get('sortBy');
    if (typeof sortBy === "string") {
      if (sortBy !== filter.sortBy) {
        filter.sortBy = sortBy as typeof filter.sortBy;
        revalidatePath('/pages/dashboard');
      }
    }
  };

  const prevPage = async (data: FormData) => {
    "use server";
    if (filter.page > 1) {
      filter.page--;
      revalidatePath('/pages/dashboard');
    }
  };

  const nextPage = async (data: FormData) => {
    "use server";
    filter.page++;
    revalidatePath('/pages/dashboard');
  };

  return (
    <div className="space-y-3">
      <form className="flex flex-col" action={submit}>
        <label>
          <p>
            Username:
          </p>
          <input type="text" name="username" />
        </label>
        <button className="self-start mt-3 bg-blue-900 text-black p-1 rounded">Add</button>
      </form>
      <form action={changeFilter} className="flex">
        <button type="button">
          <select name="sortBy" className="p-1 rounded">
            <option value="desc">Сначала новые</option>
            <option value="asc">Сначала старые</option>
          </select>
        </button>
      </form>
      <ul className="flex flex-col">
        {users.map((user) => (
          <li key={user.id}>{user.username}</li>
        ))}
      </ul>
      <div className="flex space-x-3">
        <form action={prevPage}>
          <button type="button">Назад</button>
        </form>
        <form action={nextPage}>
          <button type="button">Вперед</button>
        </form>
      </div>
    </div >
  );
};