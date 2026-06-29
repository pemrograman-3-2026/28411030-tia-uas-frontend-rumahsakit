'use client'
import { api, baseURL } from "@/lib/axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ISpesialis } from "../spesialis/page";

export interface IDokter{
    id: number
    nama_dokter: string
    jenis_kelamin: string
    tanggal_lahir: string
    created_at : string
    updated_at : string
    spesialis : ISpesialis
}

export default function AdminDokterPage () {

    const [dokter, setDokter]  = useState<IDokter[]>([])

    const getData = async () => {
        try {
            const res = await api.get('dokter/get-all')
            setDokter(res.data)
        } catch (error) {
            console.log(error)
            
        }
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <div>
            <div className="d-flex justify-content-between">
                <h4>Data Dokter</h4>
                <Link href={'/admin/dokter/create'}>
                    <button type="button" className="btn btn-success">Tambah Data Dokter</button>
                </Link>

            </div>

            <table className="table mt-4 table-hover table-striped ">
                <thead>
                    <tr>
                        <td>Nama Dokter</td>
                        <td>Jenis Kelamin</td>
                        <td>Tanggal Lahir</td>
                        <td>Spesialis</td>
                        <td>Aksi</td>
                        
                    </tr>
                </thead>

                <tbody>
                    {dokter.map(dokter=>{
                        return (
                            <tr key ={dokter.id}>
                                <td>{dokter.nama_dokter}</td>
                                <td>{dokter.jenis_kelamin}</td>
                                <td>{dokter.tanggal_lahir}</td>
                                <td>{dokter.spesialis.name}</td>
                    
                                <td>
                                <div className="d-flex">
                                    <button type="button" className="btn btn-warning me-2 ">Edit</button>
                                    <button type="button" className="btn btn-danger me-2 ">Delete</button>
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