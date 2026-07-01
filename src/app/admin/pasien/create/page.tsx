'use client'
import { api } from "@/lib/axios"
import React, { useState } from "react"
import { showToast } from "@/app/components/toast/Toast"
import { useRouter } from "next/navigation"

export default function AdminCreatePasienPage () {

    const router = useRouter()
    const [nama_pasien, setNamaPasien] = useState('')
    const [jenis_kelamin, setJenisKelamin] = useState('')
    const [tanggal_lahir, setTanggalLahir] = useState('')
    const [alamat, setAlamat] = useState('')
    const [no_telp, setNoTlp] = useState('')

    const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
        const res = await api.post("/pasien/create", {
            nama_pasien,
            jenis_kelamin,
            tanggal_lahir,
            alamat,
            no_telp,
        });

        showToast(res.data.message, "success");
        router.push("/admin/pasien");
    } catch (error: any) {
        console.log(error);
        console.log(error.response);
    }
}

    return (
        <div>
            <h4>Input Pasien</h4>
            <div className="row">
                <div className="col-md-6">
                    <form onSubmit = {onSubmit}>

                        <div className="mb-3">
                            <label className="form-label small fw-semibold">Nama Pasien</label>
                            <input 
                            type="text" 
                            name="nama_pasien"
                            className="form-control"
                            onChange={(e) => setNamaPasien(e.target.value)}
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
                            <label className="form-label small fw-semibold">Alamat</label>
                            <input 
                                type="text" 
                                name="alamat"
                                className="form-control"
                                onChange={(e) => setAlamat(e.target.value)}
                            />
                        </div>

                        <div className="mb-3">
                            <label className="form-label small fw-semibold">No Telpon</label>
                            <input 
                                type="text" 
                                name="no_telp"
                                className="form-control"
                                onChange={(e) => setNoTlp(e.target.value)}
                            />
                        </div>
                        

                        <button type="submit" className="btn btn-primary">Simpan Pasien</button>
                    </form>
                </div>

            </div>
        </div>

    )
}