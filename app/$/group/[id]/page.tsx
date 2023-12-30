import SingleGroupComponent from '@/components/SingleGroupComponent';
import { NextPage } from 'next';
import { cookies, headers } from 'next/headers';
import { usePathname } from 'next/navigation';

async function getgroupData() {
  // const pathname = usePathname();
  // const extractedValue = pathname ? pathname.split('/').pop()! : 'helper';
  const headersList=headers();
  const fullUrl = headersList.get("x-url") || "";
  const regex = /\/group\/([^\/]+)$/;
  const match= fullUrl.match(regex);
  const extractedValue: string =  match ? match[1] || "":"";
  const url = `https://splitwise-lvh3.onrender.com/api/group/${extractedValue}`;
  const cookieStore = cookies();
  const cook = cookieStore.get('accessToken');
  const res = await fetch(url, {
    method: 'GET',
    cache: 'no-store',
    headers:{
      cookie: `accessToken=${cook?.value}`,
    }
  });
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
}
const GroupDetails: NextPage = async () => {
  const data = await getgroupData();
  const group = data.group;
  return (
    <div>
      {group && (
        <SingleGroupComponent {...data}/>
      )}
    </div>
  );
};
export default GroupDetails;