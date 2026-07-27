import {
  setUserDisabled,
  updateUserRole,
} from "../../services/userManagementService";

export default function UserTable({
  users,
  refresh,
}) {
  async function changeRole(id, role) {
    await updateUserRole(id, role);
    refresh();
  }

  async function toggleUser(user) {
    await setUserDisabled(
      user.id,
      !user.disabled
    );

    refresh();
  }

  return (
    <div className="overflow-x-auto rounded-xl bg-slate-900">
      <table className="w-full">
        <thead>
          <tr className="border-b border-slate-700">
            <th className="p-3">Tên</th>
            <th className="p-3">Email</th>
            <th className="p-3">Role</th>
            <th className="p-3">Trạng thái</th>
            <th className="p-3">Thao tác</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr
              key={user.id}
              className="border-b border-slate-800"
            >
              <td className="p-3">
                {user.name}
              </td>

              <td className="p-3">
                {user.email}
              </td>

              <td className="p-3">
                <select
                  value={user.role}
                  onChange={(e) =>
                    changeRole(
                      user.id,
                      e.target.value
                    )
                  }
                  className="rounded bg-slate-800 p-2"
                >
                  <option value="customer">
                    Customer
                  </option>

                  <option value="seller">
                    Seller
                  </option>

                  <option value="admin">
                    Admin
                  </option>
                </select>
              </td>

              <td className="p-3">
                {user.disabled
                  ? "Đã khóa"
                  : "Hoạt động"}
              </td>

              <td className="p-3">
                <button
                  onClick={() =>
                    toggleUser(user)
                  }
                  className="rounded bg-red-600 px-3 py-2"
                >
                  {user.disabled
                    ? "Mở khóa"
                    : "Khóa"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}