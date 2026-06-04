import React from 'react'
import { Controller } from "react-hook-form"
import { Editor } from '@tinymce/tinymce-react'
import conf from '../../conf/conf'

function RTE({ name, control, label, defaultValue = "" }) {
  return (
    <div className='w-full'>
      {label && (
        <label
          className='inline-block mb-3 text-sm font-medium text-slate-700'>

          {label}

        </label>
      )}

      <div

        className='overflow-hidden rounded-2xl border border-slate-300 shadow-sm'

      >




        <Controller
          name={name || "content"}
          control={control}
          render={({ field: { onChange, value } }) => (
            <Editor
              apiKey={conf.tinymcApiKey}
              value={value}
              initialValue={defaultValue}
              init={{
                initialValue: defaultValue,
                height: 500,
                menubar: true,
                plugins: ["image", "advlist", "autolink", "lists", "link", "charmap", "preview", "anchor", "searchreplace", "visualblocks", "code", "fullscreen", "insertdatetime", "media", "table", "help", "wordcount"],

                toolbar: "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | image media table |removeformat | code fullscreen help",

                content_style: "body { font-family:Inter,Helvetica,Arial,sans-serif; font-size:16px ; color: #1e293b; line-height: 1.7; }"

              }}
              onEditorChange={onChange}
            />



          )}

        />

      </div>
    </div>
  )
}

export default RTE
