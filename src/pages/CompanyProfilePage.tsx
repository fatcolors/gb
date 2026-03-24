import { useState } from 'react'
import { Pen, User, Phone, Mail, CalendarClock, CircleCheck, Users, Wallet, Fuel, MapPin, Shield, AlertTriangle, Clock } from 'lucide-react'
import PageHeader from '../components/layout/PageHeader'
import KpiTile from '../components/dashboard/KpiTile'
import Tabs from '../components/ui/tabs'
import Button from '../components/ui/button'
import Badge from '../components/ui/badge'
import { companyInfo, primaryContact, capabilities, companyTiles, services, portCoverage, certifications, emergencyContacts } from '../data/company-profile'

const tabs = [
  { id: 'profile', label: 'Company Profile' },
  { id: 'services', label: 'Services  & Coverage' },
  { id: 'certification', label: 'Certification' },
  { id: 'emergency', label: 'Emergency Contacts' },
]

const tileIcons = [Users, Users, Wallet, Fuel]

function InfoRow({ label, value, icon }: { label: string; value: string; icon?: React.ReactNode }) {
  return (
    <div className="flex items-start gap-0">
      <div className="flex items-center gap-2 w-[280px] shrink-0">
        {icon}
        <span className="text-sm font-medium text-brand-300 leading-5">{label}</span>
      </div>
      <span className="text-base text-brand-800 leading-6 flex-1">{value}</span>
    </div>
  )
}

function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white border border-brand-50 rounded-2xl p-5 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-brand-800">{title}</h3>
        <Button variant="secondary" size="sm" icon={<Pen className="w-4 h-4" />}>Edit</Button>
      </div>
      {children}
    </div>
  )
}

export default function CompanyProfilePage() {
  const [activeTab, setActiveTab] = useState('profile')

  return (
    <>
      <PageHeader
        title="Company Profile"
        description="Manage your company profile and showcase your services to fleet managers"
      />

      {/* KPI Tiles */}
      <div className="flex gap-4 shrink-0">
        {companyTiles.map((tile, i) => (
          <KpiTile key={tile.title} title={tile.title} value={tile.value} suffix={tile.suffix} icon={tileIcons[i]} />
        ))}
      </div>

      {/* Tabs */}
      <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto flex flex-col gap-4 pb-4">
        {activeTab === 'profile' && (
          <>
            <SectionCard title="Basic Company Information">
              <InfoRow label="Company Name" value={companyInfo.companyName} />
              <InfoRow label="Registration number" value={companyInfo.registrationNumber} />
              <InfoRow label="VAT ID" value={companyInfo.vatId} />
              <InfoRow label="Established" value={companyInfo.established} />
              <InfoRow label="Company Size" value={companyInfo.companySize} />
              <InfoRow label="Company Website" value={companyInfo.website} />
              <InfoRow label="Company Description" value={companyInfo.description} />
            </SectionCard>

            <SectionCard title="Primary Contact Information">
              <InfoRow
                label="Contact Person"
                value={primaryContact.contactPerson}
                icon={<User className="w-5 h-5 text-brand-300" />}
              />
              <InfoRow
                label="Phone"
                value={primaryContact.phone}
                icon={<Phone className="w-5 h-5 text-brand-300" />}
              />
              <InfoRow
                label="Email"
                value={primaryContact.email}
                icon={<Mail className="w-5 h-5 text-brand-300" />}
              />
              <InfoRow
                label="Operating Hours"
                value={primaryContact.operatingHours}
                icon={<CalendarClock className="w-5 h-5 text-brand-300" />}
              />
            </SectionCard>

            <SectionCard title="Company Capabilities">
              <div className="flex flex-col gap-2.5">
                {capabilities.map((cap, i) => (
                  <div key={i} className={`flex items-center gap-2 ${i === 0 ? '' : 'pl-[280px]'}`}>
                    {i === 0 && (
                      <span className="text-sm font-medium text-brand-300 w-[280px] shrink-0">List of capabilities</span>
                    )}
                    <CircleCheck className="w-5 h-5 text-success-500 shrink-0" />
                    <span className="text-base text-brand-800">{cap}</span>
                  </div>
                ))}
              </div>
            </SectionCard>
          </>
        )}

        {activeTab === 'services' && (
          <>
            {services.map((section) => (
              <SectionCard key={section.category} title={section.category}>
                <div className="flex flex-col gap-2.5">
                  {section.items.map((item, i) => (
                    <div key={i} className="flex items-center gap-2 pl-0">
                      <CircleCheck className="w-5 h-5 text-success-500 shrink-0" />
                      <span className="text-base text-brand-800">{item}</span>
                    </div>
                  ))}
                </div>
              </SectionCard>
            ))}

            <SectionCard title="Port Coverage">
              <div className="grid grid-cols-2 gap-6">
                {portCoverage.map((region) => (
                  <div key={region.region} className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-brand-600" />
                      <span className="text-sm font-semibold text-brand-800">{region.region}</span>
                    </div>
                    <div className="flex flex-col gap-1.5 pl-7">
                      {region.ports.map((port) => (
                        <span key={port} className="text-sm text-brand-300">{port}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </SectionCard>
          </>
        )}

        {activeTab === 'certification' && (
          <SectionCard title="Certifications & Compliance">
            <div className="flex flex-col gap-4">
              {certifications.map((cert) => (
                <div key={cert.name} className="border border-brand-50 rounded-xl p-4 flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Shield className="w-5 h-5 text-brand-600" />
                      <span className="text-base font-semibold text-brand-800">{cert.name}</span>
                    </div>
                    <Badge variant={cert.status === 'Active' ? 'live' : 'warning'}>{cert.status}</Badge>
                  </div>
                  <p className="text-sm text-brand-300">{cert.description}</p>
                  <div className="flex gap-6 text-sm">
                    <span className="text-brand-300">Issuer: <span className="text-brand-800">{cert.issuer}</span></span>
                    <span className="text-brand-300">Valid until: <span className="text-brand-800">{cert.validUntil}</span></span>
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>
        )}

        {activeTab === 'emergency' && (
          <SectionCard title="Emergency Contacts">
            <div className="flex flex-col gap-4">
              {emergencyContacts.map((contact) => (
                <div key={contact.role} className="border border-brand-50 rounded-xl p-4 flex flex-col gap-3">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-warning-500" />
                    <span className="text-base font-semibold text-brand-800">{contact.role}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-y-2 gap-x-6">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-brand-300" />
                      <span className="text-sm text-brand-800">{contact.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-brand-300" />
                      <span className="text-sm text-brand-800">{contact.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-brand-300" />
                      <span className="text-sm text-brand-800">{contact.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-brand-300" />
                      <span className="text-sm text-brand-800">{contact.available}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>
        )}
      </div>
    </>
  )
}
