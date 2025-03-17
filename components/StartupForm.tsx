"use client"

import { useActionState, useState } from "react"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import MDEditor from "@uiw/react-md-editor"
import { Button } from "./ui/button"
import { Send } from "lucide-react"
import { formSchema } from "@/lib/validation"
import {z} from "zod"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"



function StartupForm () {

    const [errors, setErrors] = useState<Record<string, string>>({})
    const [pitch,setPitch] = useState("")
    const {toast} = useToast()
    const router = useRouter()

    const handleFormSubmit = async function (prevState: any, formData: FormData) {

        try {
            const formValues = {
                title: formData.get("title") as string,
                description: formData.get("description") as string,
                category: formData.get("category") as string,
                link: formData.get("link") as string,
                pitch
            }

            await formSchema.parseAsync(formValues)
            console.log(formValues)


            // const result = await createIdea(prevState, formData, pitch)

        //    if (result.status === "SUCCESS") {

        //     toast ({
        //         title: "Success",
        //         description: "Your startup pitch has beeen creaed successfully"
        //     })
        //     router.push(`/startup/${result.id}`)

        //    }

        //    return result


        } catch (error) {

            if (error instanceof z.ZodError) {
                const fieldErors = error.flatten().fieldErrors

                setErrors(fieldErors as unknown as Record<string, string>)

                toast({
                    title: "Error",
                    description: "Please check your input and try again",
                    variant: "destructive"
                })

                return {...prevState, error: "Validation failed", status: "ERROR"}
            }

            toast({
                title: "Error",
                description: "An unexpected error has occurred",
                variant: "destructive",
            });

            return {
                ...prevState,
                error: "An unexpected error has occured",
                status: "ERROR"
            }
        }

    }

    const [state, formAction, isPending] = useActionState(handleFormSubmit,
        {
            error: "",
            status: "INITIAL"
        }
    )

   
    
    return <form className="startup-form" action={formAction}>
        <div>
            <label htmlFor="title" className="startup-form_label">
                Titre
            </label>
            <Input id="title" className="startup-form_input" required placeholder="Le titre de l'article" />

            {errors.title && <p className="startup-form_error">{errors.title}</p>}

        </div>

        <div>
            <label htmlFor="description" className="startup-form_label">
                Description
            </label>
            <Textarea id="description" className="startup-form_input" required placeholder="La description de l'article" />

            {errors.description && <p className="startup-form_error">{errors.description}</p>}

        </div>

        <div>
            <label htmlFor="category" className="startup-form_label">
                Catégorie
            </label>
            <Input id="category" className="startup-form_input" required placeholder="Catégorie de l'article(Génie civil, Urbanisme...)" />

            {errors.category && <p className="startup-form_error">{errors.category}</p>}

        </div>

        <div>
            <label htmlFor="link" className="startup-form_label">
               Image(Lien)
            </label>
            <Input id="link" className="startup-form_input" required placeholder="Le lien url de l'image" />

            {errors.link && <p className="startup-form_error">{errors.link}</p>}

        </div>

        <div data-color-mode="light">
            <label htmlFor="pitch" className="startup-form_label">
               Pitch
            </label>
           <MDEditor 
                value={pitch}
                preview="edit"
                height={300}
                style={{borderRadius: 20, overflow: "hidden"}}
                onChange={function(value){
                    return setPitch(value as string)
                }}
                textareaProps={{
                    placeholder: "Décris brièvement le contanu de ton aricle"
                }}
                previewOptions={{
                    disallowedElements: ["style"]
                }}
           />

            {errors.pitch && <p className="startup-form_error">{errors.pitch}</p>}

        </div>

        <Button className="startup-form_btn text-white" type="submit" disabled={isPending}>
            {isPending ? "En cours d'envoi...": "Envoie ton article"}
            <Send className="size-6 ml-2" />
        </Button>


    </form>
}

export default StartupForm