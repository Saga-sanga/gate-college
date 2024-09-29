import RichText from '@/components/RichText'
import { getCachedGlobal } from '@/utilities/getGlobals'
import Script from 'next/script'
import { Donation } from 'src/payload-types'
import { FunraiseForm } from './components/FunraiseForm'

export default async function DonatePage() {
  const { title, content } = (await getCachedGlobal('donation', 1)()) as Donation

  return (
    <article className="container my-20 space-y-12">
      {/* Add funfraise head script here */}
      <Script id="funraise-aware" strategy="beforeInteractive">
        {`(function(f,u,n,r,a,i,s,e){var data={window:window,document:document,tag:"script",data:"funraise",orgId:f,uri:u,common:n,client:r,script:a};var scripts;var funraiseScript;data.window[data.data]=data.window[data.data]||[];if(data.window[data.data].scriptIsLoading||data.window[data.data].scriptIsLoaded)return;data.window[data.data].loading=true;data.window[data.data].push("init",data);scripts=data.document.getElementsByTagName(data.tag)[0];funraiseScript=data.document.createElement(data.tag);funraiseScript.async=true;funraiseScript.src=data.uri+data.common+data.script+"?orgId="+data.orgId;scripts.parentNode.insertBefore(funraiseScript,scripts)})('67790fed-aa86-4965-b00d-0138ace5c5bd','https://assets-demo-2.funraise.io','/widget/common/2.0','/widget/client','/inject-form.js');`}
      </Script>
      <div className="space-y-4">
        <h1 className="text-5xl font-bold text-secondary capitalize">{title}</h1>
        <hr className="border-secondary-muted" />
      </div>
      <div className="flex flex-col lg:flex-row">
        <div className="lg:basis-2/3">
          {content && <RichText className="prose-lg prose-h2:text-primary" content={content} />}
        </div>
        {/* container for donation widget */}
        <div className="lg:basis-1/3">
          <FunraiseForm />
        </div>
      </div>
    </article>
  )
}
