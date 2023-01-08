package com.integrator.group2backend.service;

import com.integrator.group2backend.dto.PolicyDTO;
import com.integrator.group2backend.dto.PolicyItemsDTO;
import com.integrator.group2backend.entities.Policy;
import com.integrator.group2backend.entities.PolicyItem;
import com.integrator.group2backend.repository.PolicyRepository;
import com.integrator.group2backend.utils.MapperService;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import static org.junit.Assert.*;
@RunWith(MockitoJUnitRunner.class)
public class PolicyServiceTest {

    @Mock
    private PolicyRepository policyRepository;
    @Mock
    private MapperService mapperService;

    private PolicyService policyService;

    @Before
    public void setUp(){
        this.policyService = new PolicyService(this.policyRepository, this.mapperService);
    }

    @Test
    public void converPolicyItems() {
        Policy policy = new Policy();
        policy.setId(1L);
        policy.setName("policy 1");

        Policy policy2 = new Policy();
        policy2.setId(2L);
        policy2.setName("policy 2");

        PolicyItem policyItem = new PolicyItem();
        policyItem.setId(1L);
        policyItem.setName("policyItem 1");
        policyItem.setPolicy(policy);

        PolicyItem policyItem2 = new PolicyItem();
        policyItem2.setId(2L);
        policyItem2.setName("policyItem 2");
        policyItem2.setPolicy(policy);

        PolicyItem policyItem3 = new PolicyItem();
        policyItem3.setId(3L);
        policyItem3.setName("policyItem 3");
        policyItem3.setPolicy(policy2);

        Set<PolicyItem> policyItemsList = new HashSet<>();
        policyItemsList.add(policyItem);
        policyItemsList.add(policyItem2);
        policyItemsList.add(policyItem3);

        List<PolicyDTO> policyList = new ArrayList<>(this.policyService.converPolicyItems(policyItemsList));
        List<PolicyItemsDTO> policyOneItems = new ArrayList<>(policyList.get(0).getPolicyItems());
        List<PolicyItemsDTO> policyTwoItems = new ArrayList<>(policyList.get(1).getPolicyItems());

        Assert.assertEquals(2, policyList.size());

        Assert.assertEquals(2, policyOneItems.size());
        Assert.assertEquals("policy 1", policyList.get(0).getName());
        Assert.assertEquals("policyItem 2", policyOneItems.get(0).getName());
        Assert.assertEquals(2, policyOneItems.get(0).getId(), 0);
        Assert.assertEquals("policyItem 1", policyOneItems.get(1).getName());
        Assert.assertEquals(1, policyOneItems.get(1).getId(), 0);

        Assert.assertEquals(1, policyTwoItems.size());
        Assert.assertEquals("policy 2", policyList.get(1).getName());
        Assert.assertEquals("policyItem 3", policyTwoItems.get(0).getName());
        Assert.assertEquals(3, policyTwoItems.get(0).getId(), 0);
    }
}