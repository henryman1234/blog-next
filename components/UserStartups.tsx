import { client } from "@/sanity/lib/client";
import { STARTUPS_BY_AUTHOR_QUERY } from "@/sanity/lib/queries";
import React from "react";
import StartupCard, { StartupTypeCard } from "./StartupCard";

async function UserStartups ({id}: {id: string}) {
    const startups = await client.fetch(STARTUPS_BY_AUTHOR_QUERY, {id})
    
    return (
        <> 
            {startups.length > 0 ? startups.map(function(startup: StartupTypeCard){
                return <StartupCard key={startup._id} post={startup} />
            }) : <p className="no-results">Vous n'avez pas d'articles</p>}
        </>
    )
}

export default UserStartups