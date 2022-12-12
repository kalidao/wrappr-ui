import { GiBriefcase, GiThreeLeaves, GiTiedScroll } from 'react-icons/gi'
import { StoreT } from '../types'
import Card from './Card'
import Soon from './Soon'
import { Stack, Heading } from '@kalidao/reality'
import * as styles from '../styles.css'

type Props = {
  choice: StoreT
  setChoice: React.Dispatch<React.SetStateAction<StoreT>>
  setView: React.Dispatch<React.SetStateAction<number>>
}

export default function Entity({ choice, setChoice, setView }: Props) {
  const setEntity = (to: string) => {
    setChoice({
      ...choice,
      entity: to,
    })
    setView(1)
  }

  return (
    <Stack>
      <Heading>Choice</Heading>
      <Card
        name="LLC"
        cta="Mint"
        learn="https://docs.wrappr.wtf/how-to/LLC/"
        icon={<GiBriefcase className={styles.icon} />}
        description={'A limited liability company (LLC) is a legal structure that combines the benefits of a corporation and a partnership. LLCs offer flexibility in terms of taxation and the ability to set membership and operating terms through private agreements. Series LLCs, which are a variation of LLCs, allow for a single filing to create separate LLCs, known as "Series," under a "Master" operating agreement. Series LLCs have their own legal identity and can hold assets and make agreements in their own name, insulated from the other Series. Delaware and Wyoming have adopted Series LLCs into their corporate statutes. The Wrappr app offers automation for the formation of tokenized LLCs using Ricardian LLCs and ERC-1155 NFTs.'}
        onClick={() => setEntity('LLC')}
      />
      <Card
        name="UNA"
        cta="Mint"
        learn="https://docs.wrappr.wtf/how-to/UNA/"
        icon={<GiThreeLeaves className={styles.icon} />}
        description={'An unincorporated non-profit association (UNA) is a legal structure that protects assets and provides a legal identity for projects with a social purpose. UNAs can be created by two or more members through agreement without the need for state filing, offering many of the same benefits as formal registration but with greater anonymity for members. The Wrappr app offers a form of UNA agreement that can be attached to accounts through the minting of an NFT. UNAs may engage in activities that produce profit so long as they are in furtherance of the non-profit purpose. However, care should be taken when distributing assets to UNA members as this may prevent it from retaining its limited liability. UNAs are taxed as corporations unless another election is made.'}
        onClick={() => setEntity('UNA')}
      />
      <Card
        name="Charter"
        cta="Mint"
        learn="https://docs.wrappr.wtf/how-to/charter/"
        icon={<GiTiedScroll className={styles.icon} />}
        description={`A DAO charter is a document that provides terms for the self-organization and rules for members of a decentralized autonomous organization (DAO) without the need for a formal legal entity. The LeXpunK Model DAO Charter is intended for unincorporated DAOs that wish to mitigate risks such as vicarious liability and potential intra-DAO fiduciary duty claims. It utilizes a "qualified code deference" philosophy of DAO participation, in which members agree that the results of the operation of the relevant smart contract system should be legally binding. The DAO Charter can also opt out of some of the consequences of partnership status, such as waiving fiduciary duties and disclaiming property rights. The Orange DAO Charter is a form that sets out low-legal terms for token communities, with an emphasis on mission and committee organization.`}
        onClick={() => setEntity('Charter')}
      />
    </Stack>
  )
}
