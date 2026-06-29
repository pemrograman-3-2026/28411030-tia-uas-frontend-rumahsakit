'use client'

import { showToast } from "@/app/components/toast/Toast"
import { api } from "@/lib/axios"
import Link from "next/link"
import { useEffect, useState } from "react"


export interface ISpesialis {
    id: number
    name: string
    description: string
    created_at: string
    updated_at: string
}

export default function SpesialisPage () {

    const [data, setData] = useState<ISpesialis[]>([])

    useEffect(() =>{
        getData()
    }, [])

    const getData = async () => {
        try {
            const res = await api.get('spesialis/get-all')
            setData(res.data)
        } catch (error) {
          console.log(error)           
        }
    }

    const deleteData = async (id: number) => {
        const isAgree = confirm('Are u Sure?')

        if (isAgree) {
            try {
                const res = await api.delete(`spesialis/delete/${id}`)
                showToast(res.data.message, 'success')
                getData()
            } catch (error: any) {
                showToast(error.response.data.message, 'danger')
            }
        }
    }

    return (
    <div>
        <h4>Spesialis</h4>
        <Link href={'/admin/spesialis/create'}>
         <button type="button" className="btn btn-success">Tambah Spesialis</button>
        </Link>
        
        <table className="table table-hover mt-4"> 
            <thead>
                <tr>
                    <td>Nama Spesialis</td>
                    <td>Deskripsi</td>
                    <td>Aksi</td>
                </tr>
            </thead>

            <tbody>
                {data.map(d => {
                    return (
                        <tr key={d.id}>
                            <td>{d.name}</td>
                            <td>{d.description}</td>
                            <td>
                                <div className="d-flex">
                                    <button type="button" className="btn btn-warning me-2">Edit</button>
                                    <button onClick={() => deleteData(d.id)} type="button" className="btn btn-danger me-2">Delete</button>
                                </div>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    </div>
    )
}