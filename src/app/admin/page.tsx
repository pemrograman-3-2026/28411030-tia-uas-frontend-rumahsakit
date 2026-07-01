'use client'

import { api } from "@/lib/axios";
import { useEffect, useState } from "react";

interface IStats {
    totalSpesialis: number;
    totalDokter: number;
    totalPasien: number;
}

export default function AdminDashboardPage() {

    const [stats, setStats] = useState<IStats>({
        totalSpesialis: 0,
        totalDokter: 0,
        totalPasien: 0
    });

    const fetchStats = async () => {
        try {
            const [spesialisRes, dokterRes, pasienRes] = await Promise.all([
            api.get('/spesialis/get-all'),
            api.get('/dokter/get-all'),
            api.get('/pasien/get-all')
        ]);

            setStats({
                totalSpesialis: Array.isArray(spesialisRes.data)
                    ? spesialisRes.data.length
                    : 0,

                totalDokter: Array.isArray(dokterRes.data)
                    ? dokterRes.data.length
                    : 0,

                totalPasien: Array.isArray(pasienRes.data)
                    ? pasienRes.data.length
                    : 0
            });

        } catch (error) {
            console.error("Gagal memuat statistik admin", error);
        }
    }

    useEffect(() => {
        fetchStats();
    }, []);

    return (
        <>
            <h1 className="h3 mb-3">Dashboard Rumah Sakit</h1>
            <p className="text-muted">
                Ringkasan data Rumah Sakit.
            </p>

            <div className="row g-3 mt-2">

                <div className="col-md-4">
                    <div className="card border-0 shadow-sm p-3 bg-primary text-white">
                        <h6>Total Spesialis</h6>
                        <h2 className="fw-bold m-0">
                            {stats.totalSpesialis}
                        </h2>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="card border-0 shadow-sm p-3 bg-success text-white">
                        <h6>Total Dokter</h6>
                        <h2 className="fw-bold m-0">
                            {stats.totalDokter}
                        </h2>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="card border-0 shadow-sm p-3 bg-danger text-white">
                        <h6>Total Pasien</h6>
                        <h2 className="fw-bold m-0">
                            {stats.totalPasien}
                        </h2>
                    </div>
                </div>

            </div>
        </>
    );
}