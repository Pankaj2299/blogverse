
const avatarColors = [
   "from-red-500 to-pink-500",
  "from-blue-500 to-indigo-500",
  "from-green-500 to-emerald-500",
  "from-purple-500 to-violet-500",
  "from-orange-500 to-amber-500",
  "from-cyan-500 to-sky-500",
  "from-teal-500 to-green-500",
  "from-fuchsia-500 to-pink-500",
  "from-rose-500 to-red-500",
  "from-lime-500 to-green-500",
  "from-yellow-500 to-orange-500",
  "from-violet-500 to-purple-500",
  "from-sky-500 to-blue-500",
  "from-emerald-500 to-teal-500",
  "from-pink-500 to-rose-500",
  "from-indigo-500 to-blue-500",
   ];


 export   const getAvatarColor =(id) => {
    
    if(!id) return avatarColors[0]

    let hash = 0

    for(let i =0 ; i < id.length ; i++){

        hash += id.charCodeAt(i)
    }

    return avatarColors[Math.abs(hash) % avatarColors.length]

   }

   



