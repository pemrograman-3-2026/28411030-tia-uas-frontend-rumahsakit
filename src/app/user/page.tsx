'use client'

import { api, baseURL } from "@/lib/axios"
import { useEffect, useState } from "react"
import { IDokter } from "../admin/dokter/page"

export default function UserDashboardPage () {

    const [dokter, setDokter] = useState<IDokter[]>([])

    const getData = async () => {
        try {
            const res = await api.get ('dokter/get-all')
            setDokter (res.data)
        } catch (error) {
            console.log(error)
            
        }
    }

    useEffect(() => {
        getData()
    }, [])

    return(
        <div>
            <div className="row">
               {dokter.map(dokter => (
                    <div key={dokter.id} className="col-md-4 col-sm-6 col-xs-12">
                        <div className="card mb-4">
                            <div className="car-body text-center gap-2 py-5">
                                <h5 className="card-title">{dokter.nama_dokter}</h5>
                                <p className="card-text">{dokter.spesialis.name}</p>
                                <div className="d-flex gap-3 justify-content-center ">
                                    <button className="btn btn-primary">Detail</button>
                                    <button className="btn btn-warning">Pilih</button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}