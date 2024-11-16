import { CLASH_URL } from "@/lib/apiEndPoints";
import { ClashType } from "@/types";

async function fetchClashes(token:string){
    const res = await fetch(CLASH_URL,{
        headers:{
            Authorization:token
        },
        next:{
            revalidate:60*60,
            tags:['dashboard']
        }
    })

    if(!res.ok){
       throw new Error('Failed to fetch data')
    }
    const response = await res.json()
    if(response.data){
       return response.data
    }
    return []
    
}

export async function fetchClash(clashId: number): Promise<ClashType | null> {
    try {
      const res = await fetch(`${CLASH_URL}/${clashId}`);
      if (!res.ok) {
        console.error(`Error fetching clash: ${res.statusText}`);
        throw new Error('Failed to fetch data');
      }
      const response = await res.json();
      return response.data ?? null;
    } catch (error) {
      console.error('fetchClash error:', error);
      throw error;
    }
  }
  



export default fetchClashes






