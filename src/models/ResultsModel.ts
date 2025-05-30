import mongoose, { Schema, Document } from 'mongoose';

interface Result {
    framework: string;
    requests_per_sec: number;
    avg_latency_ms: number;
    transfer_kb_sec: number;
}

interface SystemInfo {
    os: string;
    cpu: string;
    ram: string; // e.g., "8 GB"
    date: string; // ISO string or formatted string
    benchmark_command: string;
    python_version: string;
    node_version: string;
    bun_version: string;
    deno_version: string;
    go_version: string;
}

export interface ResultsDocument extends Document {
    results: Result[];
    system_info: SystemInfo;
    createdAt: Date;
}

const ResultSchema = new Schema<Result>(
    {
        framework: { type: String, required: true },
        requests_per_sec: { type: Number, required: true },
        avg_latency_ms: { type: Number, required: true },
        transfer_kb_sec: { type: Number, required: true },
    },
    { _id: false }
);

const SystemInfoSchema = new Schema<SystemInfo>(
    {
        os: { type: String, required: true },
        cpu: { type: String, required: true },
        ram: { type: String, required: true },
        date: { type: String, required: true },
        benchmark_command: { type: String, required: true },
        python_version: { type: String, required: true },
        node_version: { type: String, required: true },
        bun_version: { type: String, required: true },
        deno_version: { type: String, required: true },
        go_version: { type: String, required: true },
    },
    { _id: false }
);

const ResultsSchema = new Schema<ResultsDocument>(
    {
        results: { type: [ResultSchema], required: true },
        system_info: { type: SystemInfoSchema, required: true },
    },
    { timestamps: { createdAt: true, updatedAt: false } }
);

export const ResultsModel = mongoose.model<ResultsDocument>('Results', ResultsSchema);
