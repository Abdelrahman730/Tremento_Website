import React from 'react'

export default function Error() {
  return (
    <div>
        <div className="page-error-wrapper">
        <div>
            <h1 className="error-title">404</h1>
            <h5 className="tx-sm-24 tx-normal">Oopps. The page you were looking for doesn't exist.</h5>
            <p className="mg-b-50">You may have mistyped the address or the page may have moved.</p>
            <p className="mg-b-50"><a href="/" className="btn btn-error">Back to Home</a></p>
            <p className="error-footer">&copy; Copyright 2022. All Rights Reserved.</p>
        </div>

        </div>
    </div>
  )
}
