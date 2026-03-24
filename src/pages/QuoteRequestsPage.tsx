import { useState } from 'react'
import { MoreVertical } from 'lucide-react'
import PageHeader from '../components/layout/PageHeader'
import SearchInput from '../components/ui/search-input'
import Badge, { getFuelBadgeVariant } from '../components/ui/badge'
import { quoteRequests } from '../data/quote-requests'

function getPriorityVariant(priority: string) {
  if (priority === 'High') return 'error'
  if (priority === 'Medium') return 'warning'
  return 'default'
}

export default function QuoteRequestsPage() {
  const [search, setSearch] = useState('')

  return (
    <>
      <PageHeader
        title="Quotes Requests"
        actions={
          <SearchInput
            placeholder="Search..."
            value={search}
            onChange={setSearch}
            className="w-[250px]"
          />
        }
      />

      <div className="bg-white border border-brand-50 rounded-2xl flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto">
          <table className="w-full text-sm">
            <thead className="sticky top-0 bg-white z-10">
              <tr className="border-b border-brand-50">
                <th className="text-left py-3 px-4 text-xs font-medium text-brand-300">ID</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-brand-300">Vessel</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-brand-300">Fuel Type</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-brand-300">Quantity</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-brand-300">Delivery Port</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-brand-300">Delivery Date</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-brand-300">Priority</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-brand-300">Quote</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-brand-300">Contact</th>
                <th className="w-10"></th>
              </tr>
            </thead>
            <tbody>
              {quoteRequests.map((q) => (
                <tr key={q.id} className="border-b border-brand-50 last:border-b-0 hover:bg-brand-25/50">
                  <td className="py-4 px-4 text-brand-800 font-medium">{q.quoteId}</td>
                  <td className="py-4 px-4 text-brand-800">{q.vessel}</td>
                  <td className="py-4 px-4">
                    <Badge variant={getFuelBadgeVariant(q.fuelType)}>{q.fuelType}</Badge>
                  </td>
                  <td className="py-4 px-4 text-brand-800">{q.quantity}</td>
                  <td className="py-4 px-4 text-brand-800">
                    <span className="inline-flex items-center gap-1.5">🇳🇱 {q.deliveryPort}</span>
                  </td>
                  <td className="py-4 px-4 text-brand-800">{q.deliveryDate}</td>
                  <td className="py-4 px-4">
                    <span className="inline-flex items-center gap-1.5">
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          q.priority === 'High'
                            ? 'bg-error-700'
                            : q.priority === 'Medium'
                            ? 'bg-warning-500'
                            : 'bg-brand-300'
                        }`}
                      />
                      <span className="text-brand-800">{q.priority}</span>
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    {q.hasQuote && (
                      <Badge variant="success">Yes</Badge>
                    )}
                  </td>
                  <td className="py-4 px-4">
                    <div className="text-brand-800 font-medium">{q.contact.name}</div>
                    <div className="text-xs text-brand-300">{q.contact.email}</div>
                    <div className="text-xs text-brand-300">{q.contact.phone}</div>
                  </td>
                  <td className="py-4 px-1">
                    <button className="p-1 hover:bg-brand-25 rounded cursor-pointer bg-transparent border-none">
                      <MoreVertical className="w-5 h-5 text-brand-300" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
