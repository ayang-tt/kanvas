import useAxios from 'axios-hooks';
import styled from "@emotion/styled";
import FlexSpacer from "../../design-system/atoms/FlexSpacer";
import PageWrapper from "../../design-system/commons/PageWrapper";

import { FC } from "react";
import { useTranslation } from 'react-i18next';
import { CardMedia, Skeleton, Stack, Theme } from '@mui/material';
import { CustomButton } from '../../design-system/atoms/Button';
import { Typography } from "../../design-system/atoms/Typography";
import { INft } from '../../interfaces/artwork';


export interface ProductPageProps {
    theme?: Theme;
}

const StyledStack = styled(Stack)`
    overflow: hidden;
    width: 100vw;
    max-width: 100rem;
    height: 100%;
    align-items: center;
    margin-bottom: 4rem;
`

const data : INft = {
    id: 1,
    name: 'AD # 8210',
    creator: 'Aurélia Durand',
    ipfsHash: 'https://uploads-ssl.webflow.com/60098420fcf354eb258f25c5/60098420fcf3542cf38f287b_Illustrations%202019-37.jpg',
    price: 20,
    startDate: '12:12:43:00'
}

export const ProductPage : FC<ProductPageProps> = ({...props}) => {
    const { t } = useTranslation(['translation']);

    const [getNft, refetch] = useAxios('http://localhost:3000/nfts')

    return (
        <PageWrapper>
            <StyledStack direction='column' spacing={3}>

                <FlexSpacer minHeight={8} />

                <Stack direction={{ sm: 'column', md: 'row' }} spacing={5} sx={{width: '100%'}}>
                    {
                        getNft.loading ?
                            <Skeleton height='40rem' width='40rem' sx={{transform: 'none'}}/>
                       :
                            <CardMedia
                                component="img"
                                image="https://uploads-ssl.webflow.com/60098420fcf354eb258f25c5/60098420fcf3542cf38f287b_Illustrations%202019-37.jpg"
                                alt="random"
                                sx={{
                                    height: '75vh',
                                    minHeight: 400,
                                    maxHeight: 1000,
                                    maxWidth: 1000
                                }}
                            />
                    }

                    <Stack direction ="column" sx={{position: 'relative', padding: '1rem'}}>

                        {/* Headline */}

                        <Typography
                            size="h4"
                            weight="SemiBold"
                        >
                            {   getNft.loading ?
                                    <Skeleton width='15rem' height='2rem'/>
                                :
                                    data.creator
                            }
                        </Typography>

                        <Typography
                            size="h2"
                            weight="SemiBold"
                            >
                            {   getNft.loading ?
                                    <Skeleton width='10rem' height='2rem'/>
                                :
                                    data.name
                            }
                        </Typography>


                        {/* Headline */}
                        <Typography
                            size="h5"
                            weight="SemiBold"
                            sx={{ pt: 4}}
                        >
                            {   getNft.loading ?
                                <Skeleton width='10rem' height='2rem'/>
                            :
                                t('product.description.part_1')
                            }
                        </Typography>
                        <Typography
                            size="h5"
                            weight="Light"
                            sx={{ pt: 2,  mb: 1 }}
                        >
                            {   getNft.loading ?
                                <Stack direction="column">
                                    <Skeleton width='40rem' height='1rem'/>
                                    <Skeleton width='40rem' height='1rem'/>
                                    <Skeleton width='40rem' height='1rem'/>
                                    <Skeleton width='10rem' height='1rem'/>
                                </Stack>
                            :
                                t('common.lorenIpsumShort')
                            }
                        </Typography>

                        <Typography
                            size="body"
                            weight="SemiBold"
                            sx={{ pt: 4 }}
                        >
                            {   getNft.loading ?
                                <Skeleton width='10rem' height='2rem'/>
                            :
                                t('product.description.part_2')
                            }
                        </Typography>
                        <Typography
                            size="h5"
                            weight="Light"
                            sx={{ pt: 2,  mb: 1 }}
                        >
                            {   getNft.loading ?
                                <Stack direction="column">
                                    <Skeleton width='40rem' height='1rem'/>
                                    <Skeleton width='40rem' height='1rem'/>
                                    <Skeleton width='40rem' height='1rem'/>
                                    <Skeleton width='10rem' height='1rem'/>
                                </Stack>
                            :
                                t('common.lorenIpsum')
                            }
                        </Typography>
                        <Typography
                            size="body1"
                            weight="SemiBold"
                            sx={{ pt: 4 }}
                        >
                            {getNft.loading ? undefined : t('product.description.part_3')}
                        </Typography>

                        <Typography
                            size="h5"
                            weight="Light"
                            sx={{ pt: 2,  mb: 1 }}
                        >
                            {getNft.loading ? undefined : data.startDate}
                        </Typography>

                        <Typography
                            size="body1"
                            weight="SemiBold"
                            sx={{ pt: 4 }}
                        >
                            {getNft.loading ? undefined : t('product.description.price')}
                        </Typography>

                        <Typography
                            size="h5"
                            weight="Light"
                            sx={{ pt: 2,  mb: 1 }}
                        >
                            {getNft.loading ? undefined : `${data.price} ꜩ`}
                        </Typography>

                        <FlexSpacer minHeight={2}/>

                        <CustomButton size="medium" label={t('product.button_1')} disabled={getNft.loading}/>

                    </Stack>
                </Stack>
            </StyledStack>
        </PageWrapper>
    )
}

export default ProductPage;