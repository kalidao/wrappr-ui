import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(_req: NextApiRequest, res: NextApiResponse) {
    try {
        const name = _req.body
        if (!name) {
            return res.status(400).json({
                error: 'Name is required',
            })
        }

        const response = await fetch('https://api.opencorporates.com/v0.4.8/companies/search?q=' +
        encodeURIComponent(name) +
        '&jurisdiction_code=us_de' + `&api_token=${process.env.OPENCORPORATES_KEY}`, {
            method: 'GET',
        })
        const data = await response.json()

        if (response.ok) {
            return res.status(200).json({
                isAvailable: data.results.total_count > 0,
            })
        } else {
            return res.status(response.status).json({
                error: data.error,
            })
        }
    } catch(e) {
        res.status(500).json({
            error: e,
        })
    }
}
