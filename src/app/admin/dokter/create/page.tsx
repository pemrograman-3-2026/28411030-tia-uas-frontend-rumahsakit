'use client'
import { api } from "@/lib/axios"
import React, { useEffect, useState } from "react"
import { ISpesialis } from "../../spesialis/page"
import { showToast } from "@/app/components/toast/Toast"
import { useRouter } from "next/navigation"

export default function AdminCreateDokterPage () {

    const router = useRouter()
    const [spesialis, setSpesialis] = useState<ISpesialis[]>([])
    const [nama_dokter, setNamaDokter] = useState('')
    const [jenis_kelamin, setJenisKelamin] = useState('')
    const [tanggal_lahir, setTanggalLahir] = useState('')
    const [id_spesialis, setIdSpesialis] = useState('')

    const getSpesialis = async () => {
        try {
            const res = await api.get('spesialis/get-all')
            setSpesialis(res.data)
        } catch (error) {
            console.log(error)
            
        }
    }

    useEffect (() => {
        getSpesialis()
    }, [])

    const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
        const res = await api.post("/dokter/create", {
            nama_dokter,
            jenis_kelamin,
            tanggal_lahir,
            id_spesialis,
        });

        showToast(res.data.message, "success");
        router.push("/admin/dokter");
    } catch (error: any) {
        console.log(error);
        console.log(error.response);
    }
}

    return (
        <div>
            <h4>Input Dokter</h4>
            <div className="row">
                <div className="col-md-6">
                    <form onSubmit = {onSubmit}>

                        <div className="mb-3">
                            <label className="form-label small fw-semibold">Nama Dokter</label>
                            <input 
                            type="text" 
                            name="nama_dokter"
                            className="form-control"
                            onChange={(e) => setNamaDokter(e.target.value)}
                            />
                        </div>

                      <div className="mb-3">
                            <label className="form-label small fw-semibold">Jenis Kelamin</label>
                            <select 
                                className="form-control"
                                onChange={(e) => setJenisKelamin(e.target.value)}
                                defaultValue={""}
                            >
                                <option disabled value={""}>Pilih Jenis Kelamin</option>
                                <option value="L">Laki-laki</option>
                                <option value="P">Perempuan</option>
                            </select>
                        </div>

                         <div className="mb-3">
                            <label className="form-label small fw-semibold">Tanggal Lahir</label>
                            <input 
                                type="date" 
                                className="form-control"
                                onChange={(e) => setTanggalLahir(e.target.value)}
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label small fw-semibold">Spesialis</label>
                            <select 
                            name="id_spesialis" 
                            className="form-control"
                            onChange={(e) => setIdSpesialis(e.target.value)}
                            defaultValue={""}
                            >
                                <option 
                                disabled
                                value={""}
                                >Pilih Spesialis</option>
                                {spesialis.map(spesialis => {
                                    return(
                                        <option
                                        key={spesialis.id}
                                        value={spesialis.id}
                                        >
                                            {spesialis.name}
                                        </option>
                                    )
                                })}
                            </select> 
                        </div>
                        

                        <button type="submit" className="btn btn-primary">Simpan Dokter</button>
                    </form>
                </div>

            </div>
        </div>

    )
}