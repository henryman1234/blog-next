"use client"

import { useActionState, useState } from "react"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import MDEditor from "@uiw/react-md-editor"
import { Button } from "./ui/button"
import { Send } from "lucide-react"

function StartupForm () {

    const [errors, setErrors] = useState<Record<string, string>>({})
    const [pitch,setPitch] = useState("")
    const handleFormSubmit = async function () {

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

        <Button className="startup-form_btn text-white">
            {isPending ? "En cours d'envoi...": "Envoie ton article"}
            <Send className="size-6 ml-2" />
        </Button>


    </form>
}

export default StartupForm