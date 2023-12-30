import AddExpensebutton from "./AddExpensebutton";

export default function SingleGroupComponent(props: any) {
  const group = props.group;
  const userDetailMap = props.userDetailMap;

  const calculateTotalOwes = (toUsers: { user: string; amount: number; _id: string }[], userDetailMap: any): string => {
    return toUsers.reduce((total, owe) => total + owe.amount, 0).toFixed(2);
  };

  const getUserById = (userId: string, userDetailMap: any): string => {
    const user = userDetailMap[userId];
    return user ? user.name : 'Unknown User';
  };

  const getOwesOrGetsBack = (amount: number): string => {
    return amount < 0 ? 'owes' : 'gets back';
  };

  const toOrFrom = (amount: number): string => {
    return amount < 0 ? 'to' : 'from';
  };

  return (
    <div>
      <div className="flex justify-between items-center mt-4">
        <h1 className="mr-auto text-3xl font-bold mb-1">{group.name}</h1>
        <AddExpensebutton />
      </div>
      <div className="overflow-x-auto">
        {group.members.map((member: any) => (
          <div key={member._id} className="member-container p-8 border-b border-gray-700">
            <div className="member-info mb-1">
              <h2 className="text-xl font-semibold">{getUserById(member.user, userDetailMap)}</h2>
              <p className="text-sm text-gray-500 ">Total Owes: ₹{calculateTotalOwes(member.toUsers, userDetailMap)}</p>
            </div>
            <div className="owes-list">
              {member.toUsers.map((owe: any) => (
                <p key={owe._id} className="text-sm">
                  {getUserById(member.user, userDetailMap)} {getOwesOrGetsBack(owe.amount)} ₹{Math.abs(owe.amount)} {toOrFrom(owe.amount)} {getUserById(owe.user, userDetailMap)}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
