import { formatDate } from "@/lib/utils";
import { client } from "@/sanity/lib/client";
import { SATRTUP_BY_ID_QUERY } from "@/sanity/lib/queries";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import React, { Suspense } from "react";
import markdownit from "markdown-it";
import { Skeleton } from "@/components/ui/skeleton";
import View from "@/components/View";

const md = markdownit()

export const experimental_ppr = true;

const Page = async function ({params}: {params: Promise<{id: string}>}) {

    const id = (await params).id

    const post = await client.fetch(SATRTUP_BY_ID_QUERY, {id})
    if (!post) return notFound()
    
    const parsedContent = md.render(post?.pitch || "") 

    
    return <>
       <section className="pink_container !min-h-[230px]">
            <p className="tag tag-tri">{formatDate(post._createdAt)}</p>

            <h1 className="heading ">{post.title}</h1>

            <p className="sub-heading !max-w-5xl">{post.description}</p>
       </section>

       <section className="section_container">
            <img src={post.image} alt="thumbnail"
            className="w-full h-auto rounded-xl" />

            <div className="space-y-5 mt-10 max-w-4xl mx-auto">
                <div className="flex-between gap-5">
                    <Link href={`/user/${post.author?._id}`} className="flex gap-2 items-center P-2 mb-3">
 
                        <img src={post.author.image} alt="avatar" style={{borderRadius: "50%", height: "55px", width: "55px", objectFit: "cover"}} />

                        <div>
                            <p className="text-20 medium">
                                {post.author.name}
                            </p>

                            <p className="text-16-medium !text-200">@{post.author.username}</p>
                        </div>
                    </Link> 

                    <p className="category-tag">{post.category}</p>
                </div>

                <h3 className="text-30-bold">Détails de l'article</h3>
                {parsedContent ? (
                    <article className="prose font-work-sans break-all" dangerouslySetInnerHTML={{__html:parsedContent}}/>
                ): <p className="no-results">Pas de détails disponibles</p>}
            </div>

            <hr className="divider" />

            {/* TODO: EDITOR SELECTED STARTUPS */}


            <Suspense fallback={<Skeleton className="view_skeleton"/>} >
              <View id = {id}/>
            </Suspense>

       </section>

       
    </>
}

export default Page