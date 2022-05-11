import { useEffect, useState } from 'react';
import { api } from '../lib/api';

interface Feedbacks {
  id: string;
  type: string; 
  comment: string; 
  screenshot?: string | null; 
}

export function FeedbacksListing() {
  const [feedbacks, setFeedbacks] = useState<Feedbacks[]>();

  useEffect(() => {
    api.get("/feedbacks", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      }
    }).then(e => {
        setFeedbacks(e.data)
      })
  }, [])
  
  return (
    <div className='flex flex-col items-center gap-4 mt-8'> 
      {feedbacks?.map((e) => (
        <div key={e.id} className='bg-zinc-800 rounded-md flex p-2 gap-4'>
          {e.screenshot && <img src={e.screenshot} className='h-32 w-32'/>} 
          <div>
            <h3 className='mb-2'> 
              {e.id}
            </h3>
            <p className='mb-2'>
              {e.type}
            </p>
            <p>
              {e.comment}
            </p>
          </div>
        </div> 
      ))}
    </div>
  );
}
