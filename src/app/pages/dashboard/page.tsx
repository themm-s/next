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
    <div>
      <form action={prevPage}>
        <button>Назад</button>
      </form>
      <form action={nextPage}>
        <button>Вперед</button>
      </form>
      <form className="flex flex-col" action={submit}>
        <label>
          <p>
            username:
          </p>
          <input type="text" name="username" />
        </label>
        <button>Add</button>
      </form>
      <form action={changeFilter}>
        <button>
          <select name="sortBy">
            <option value="desc">Сначала новые</option>
            <option value="asc">Сначала старые</option>
          </select>
        </button>
      </form>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.username}</li>
        ))}
      </ul>
    </div>
  );
};