'use client'
import { api, baseURL } from "@/lib/axios";
import Link from "next/link";
import { useEffect, useState } from "react";


export interface IPasien{
    id: number
    nama_pasien: string
    jenis_kelamin: string
    tanggal_lahir: string
    alamat: string
    no_telp: string
    created_at : string
    updated_at : string
}

export default function AdminPasienPage () {

    const [pasien, setPasien]  = useState<IPasien[]>([])

    const getData = async () => {
        try {
            const res = await api.get('pasien/get-all')
            setPasien(res.data)
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
                <h4>Data Pasien</h4>
                <Link href={'/admin/pasien/create'}>
                    <button type="button" className="btn btn-success">Tambah Data Pasien</button>
                </Link>

            </div>

            <table className="table mt-4 table-hover table-striped ">
                <thead>
                    <tr>
                        <td>Nama Pasien</td>
                        <td>Jenis Kelamin</td>
                        <td>Tanggal Lahir</td>
                        <td>Alamat</td>
                        <td>No Telpon</td>
                        <td>Aksi</td>
                        
                    </tr>
                </thead>

                <tbody>
                    {pasien.map(pasien=>{
                        return (
                            <tr key ={pasien.id}>
                                <td>{pasien.nama_pasien}</td>
                                <td>{pasien.jenis_kelamin}</td>
                                <td>{pasien.tanggal_lahir}</td>
                                <td>{pasien.alamat}</td>
                                <td>{pasien.no_telp}</td>
                    
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