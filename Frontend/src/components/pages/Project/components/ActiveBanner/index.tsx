import React from 'react'

const ActiveBanner: React.FC = () => {
   return (
      <div
         className="h-[300px] text-[#ffffff] pl-8 py-32 rounded-md bg-local bg-center "
         style={{
            backgroundImage:
               'url(https://wordpress.iqonic.design/product/wp/socialv/wp-content/uploads/buddypress/groups/14/cover-image/62be922d671b9-bp-cover-image.jpg)',
            objectFit: 'cover',
         }}
      >
         <span className="text-4xl font-medium">Project Directory</span>
         <p className="mt-1">Good Communication is the key to cop-up with good ideas</p>
      </div>
   )
}

export default ActiveBanner
