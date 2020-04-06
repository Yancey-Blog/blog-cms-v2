import gql from 'graphql-tag'

export const GET_BANWAGON_SERVICE_INFO = gql`
  query GetBanwagonServiceInfo {
    getBanwagonServiceInfo {
      data_counter
      plan_monthly_data
      plan_disk
      ve_used_disk_space_b
      plan_ram
      mem_available_kb
      swap_total_kb
      swap_available_kb
    }
  }
`
