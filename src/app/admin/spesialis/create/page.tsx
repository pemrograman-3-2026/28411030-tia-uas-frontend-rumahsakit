'use client'

import { showToast } from "@/app/components/toast/Toast"
import { api } from "@/lib/axios"
import { useRouter } from "next/navigation";
import { useState } from "react"




export default function CreateSpesialisPage () {

    const router = useRouter();

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')

    const onSubmit = async (e: React.SubmitEvent) => {
        e.preventDefault()
        try {
           const res = await api.post('/spesialis/create', {
                name,
                description
        })
        showToast (res.data.message, 'success')
        router.push("/admin/spesialis");
        } catch (error: any) {
          console.log(error.response.data.message, 'danger')
        }
    }

    return (
        <div>
            <h4> Input Spesialis</h4>
            <div className="row">
                <div className="col-md-6">
                    <form onSubmit={onSubmit}>
                <div className="mb-3">
                    <label className="form-label small fw-semibold">Spesialis</label>
                    <input 
                      type="text" 
                      name="name"
                      className="form-control form-control-sm py-2"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      />
                </div>
                <div className="mb-3">
                    <label className="form-label small fw-semibold">Description</label>
                    <input 
                      type="text" 
                      name="description"
                      className="form-control form-control-sm py-2"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      />
                </div>
                <button type="submit" className="btn btn-success">Save</button>
            </form>
        </div>
    </div>
 </div>
    )
}