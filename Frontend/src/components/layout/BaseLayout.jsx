import React from 'react'

const BaseLayout = ({ sidebar, content }) => {
    return (
        <> 
            <div className="h-screen bg-base-200">
                <div className="flex items-center justify-center pt-16">
                    <div className="bg-base-100 rounded-lg shadow-cl w-full h-[calc(100vh-64px)]">
                        <div className="flex h-full rounded-lg overflow-hidden">
                            {sidebar}
                            <main className="flex-1">
                                {content}
                            </main>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default BaseLayout