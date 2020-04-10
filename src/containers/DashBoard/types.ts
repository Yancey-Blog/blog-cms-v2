export interface IBandwagonServiceInfo {
  data_counter: number
  plan_monthly_data: number
  plan_disk: number
  ve_used_disk_space_b: number
  plan_ram: number
  mem_available_kb: number
  swap_total_kb: number
  swap_available_kb: number
}

export interface IBandwagonUsageStatus {
  timestamp: string
  network_in_bytes: string
  network_out_bytes: string
  disk_read_bytes: string
  disk_write_bytes: string
  cpu_usage: string
}
