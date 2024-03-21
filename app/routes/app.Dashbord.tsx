import { Page, Badge, Text, Button, ButtonGroup, InlineStack, BlockStack, Card, List, Box, Bleed, InlineGrid, ResourceList, ActionList, Popover } from '@shopify/polaris';
import React, { useState } from 'react';
export default function Dashbord() {
    const [actionActive, toggleAction] = useState(false);

    const handleToggleAction = () => {
        toggleAction(!actionActive);
    };

    const items = [{ content: 'Gross Sales' }, { content: 'Net Sales' }];

    const disclosureButtonActivator = (
        <Button variant="plain" disclosure onClick={handleToggleAction}>
            View Sales
        </Button>
    );

    const disclosureButton = (
        <Popover
            active={actionActive}
            activator={disclosureButtonActivator}
            onClose={handleToggleAction}
        >
            <ActionList items={items} />
        </Popover>
    );

    const salesMarkup = (
        <div>
            <ResourceList
                resourceName={{ singular: 'sale', plural: 'sales' }}
                items={ [
                    {
                        sales: 'Question',
                        amount: '0.00',
                        count: 40,
                        content: "notre service ?",
                        url: '#',
                    },
                    {
                        sales: 'Reponse',
                        amount: '250.00',
                        countr: [40,55,16],
                        reponse: ["good", 'bad', 'alright'],
                        url: '#',
                    },
                    {
                        sales: 'Question',
                        amount: '0.00',
                        count: 40,
                        content: "notre service ?",
                        url: '#',
                    },
                    {
                        sales: 'Reponse',
                        amount: '250.00',
                        countr: [40,55,16],
                        reponse: ["good", 'bad', 'alright'],
                        url: '#',
                    },
                ]}
                renderItem={(item) => {
                    const { sales, amount, url, content, reponse,countr } = item;
                    return (
                        <ResourceList.Item
                            id={sales}
                            url={url}
                            accessibilityLabel={`View Sales for ${sales}`}
                        >
                            <InlineStack align="space-between">
                                { sales==='Question' ?( 
                                <>
                                <div>{sales}</div>
                                <div>{content}</div>
                               
                                <div>{amount}</div></> ):  <>
                                <div>{sales}</div>
                                <div>
    {reponse.map((reponse, index) => (
      <div key={index}>{reponse}</div>
    ))}
  </div>
  <div>
    {countr.map((count, index) => (
      <div key={index}>{count}</div>
    ))}
  </div>
                                </>}  
                            </InlineStack>
                        </ResourceList.Item>
                    );
                }}
            />
        </div>
    );
    return (
        <Page
            backAction={{ content: 'Products', url: '#' }}
            title="Dashbord"
            titleMetadata={<Badge tone="attention">Verified</Badge>}
            primaryAction={{ content: 'Save', disabled: true }}
            secondaryActions={[
                { content: 'Duplicate' },
                { content: 'View on your store' },
            ]}
            pagination={{
                hasPrevious: true,
                hasNext: true,
            }}
        >
            <Card roundedAbove="sm">
                <BlockStack gap="200">
                    <InlineGrid columns="1fr auto">
                        <Text as="h2" variant="headingSm">
                            Dashbord
                        </Text>
                        <ButtonGroup>
                            <Button variant="plain">Total Sales</Button>
                            {disclosureButton}
                        </ButtonGroup>
                    </InlineGrid>
                    <BlockStack gap="400">
                        <Text as="p" variant="bodyMd">
                            You can use sales reports to see information about your customers’
                            orders based on criteria such as sales over time, by channel, or by
                            staff.
                        </Text>
                        <Text as="h3" variant="headingSm" fontWeight="medium">
                            statiatique de survey
                        </Text>
                    </BlockStack>
                    {salesMarkup}
                    <Bleed marginInline="400">
                        <Box
                            background="bg-surface-secondary"
                            paddingBlock="300"
                            paddingInline="400"
                        >
                            <BlockStack gap="200">
                                <Text as="h3" variant="headingSm" fontWeight="medium">
                                    Deactivated reports
                                </Text>
                                <List>
                                    <List.Item>Payouts</List.Item>
                                    <List.Item>Total Sales By Channel</List.Item>
                                </List>
                            </BlockStack>
                        </Box>
                    </Bleed>
                    <BlockStack gap="200">
                        <Text as="h3" variant="headingSm" fontWeight="medium">
                            Note
                        </Text>
                        <Text as="p" variant="bodyMd">
                            The sales reports are available only if your store is on the Shopify
                            plan or higher.
                        </Text>
                        <InlineStack align="end">
                            <ButtonGroup>
                                <Button onClick={() => { }} accessibilityLabel="Dismiss">
                                    Dismiss
                                </Button>
                                <Button
                                    variant="primary"
                                    onClick={() => { }}
                                    accessibilityLabel="Export Report"
                                >
                                    Export Report
                                </Button>
                            </ButtonGroup>
                        </InlineStack>
                    </BlockStack>
                </BlockStack>
            </Card>
        </Page>
    );
}