import useRole from "../../hooks/useRole";

export default function RoleBadge() {
    const { role, roleLabel } = useRole();

    let color = "bg-gray-500";

    switch (role) {
        case "admin":
            color = "bg-red-500";
            break;

        case "seller":
            color = "bg-orange-500";
            break;

        case "customer":
            color = "bg-blue-500";
            break;

        default:
            color = "bg-gray-500";
    }

    return (
        <span
            className={`${color} inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold text-white`}
        >
            {roleLabel}
        </span>
    );
}