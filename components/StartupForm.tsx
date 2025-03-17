"use client"

import { useState } from "react"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"

function StartupForm () {

    const [errors, setErrors] = useState<Record<string, string>>({})
    
    return <form className="startup-form" action={function(){
        {}
    }}>
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


    </form>
}

export default StartupForm