import { createClient } from "@supabase/supabase-js";
import fs from "fs";
import path from "path";

function loadEnv(file) {
  if (!fs.existsSync(file)) return;
  for (const line of fs.readFileSync(file, "utf8").split(/\r?\n/)) {
    const match = line.match(/^([A-Z0-9_]+)=(.*)$/);
    if (match && !process.env[match[1]]) process.env[match[1]] = match[2].trim();
  }
}

loadEnv(path.join(process.cwd(), ".env"));
loadEnv(path.join(process.cwd(), ".env.local"));

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) {
  console.error("Missing SUPABASE credentials");
  process.exit(1);
}

const supabase = createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });

const ADMIN_ID = "be44da83-ef9c-4157-a14c-bb3774d9e95f";

export const COURSES = [
  {
    id: "c1000000-0000-4000-8000-000000000001",
    title: "PMP® Certification",
    price: 1000,
    is_published: true,
    thumbnail_url: "/courses/pmp-certification.png",
    description: "Master the Project Management Professional (PMP)® certification aligned with the latest PMBOK® Guide. Learn predictive, agile, and hybrid project management frameworks from certified industry practitioners.",
    metadata: {
      partner: "Eminence Career Solution",
      category: "Project Management",
      level: "Intermediate",
      rating: 5.0,
      review_count: 9546,
      enrolled_count: 35000,
      duration_label: "35 Hours",
      subtitle: "Globally recognized project leadership certification.",
      instructor_name: "Senior PMP Lead Trainer",
      instructor_title: "Certified Project Director & Enterprise Agile Coach",
      instructor_bio: "Experienced project director with over 15 years guiding cross-functional teams and mentoring over 10,000 PMP aspirants to first-attempt passes.",
      skills: ["Agile", "Scrum", "Risk Management", "Project Planning", "Stakeholder Engagement", "Scope Management"],
      learning_points: [
        "Master People, Process, and Business Environment domains.",
        "Implement predictive, agile, and hybrid development lifecycles.",
        "Pass situational and scenario-based PMP exam questions with confidence.",
        "Fulfill 35 Contact Hours requirement for PMI application."
      ]
    },
    pdfs: [
      { title: "PMP Exam Content Outline & Mindset", module_title: "Module 1: Foundations", summary: "Understanding the PMP exam structure and Agile vs Predictive mindset." },
      { title: "Project Initiation & Stakeholder Engagement", module_title: "Module 2: Project Delivery", summary: "Managing charter development, stakeholders, and team charters." },
      { title: "Agile Frameworks & Risk Management", module_title: "Module 3: Agile & Compliance", summary: "Sprint execution, risk registers, and business compliance." }
    ]
  },
  {
    id: "c1000000-0000-4000-8000-000000000002",
    title: "AWS Certified Solutions Architect - Associate",
    price: 900,
    is_published: true,
    thumbnail_url: "/courses/aws-solutions-architect-associate.png",
    description: "Design resilient, high-performing, secure, and cost-optimized architectures on Amazon Web Services. Pass the AWS SAA-C03 exam with comprehensive hands-on labs and architecture blueprints.",
    metadata: {
      partner: "Eminence Career Solution",
      category: "Cloud",
      level: "Beginner",
      rating: 5.0,
      review_count: 2042,
      enrolled_count: 28400,
      duration_label: "40 Hours",
      subtitle: "Architect secure, resilient, and high-availability systems on AWS.",
      instructor_name: "Cloud Solutions Architect",
      instructor_title: "AWS Authorized Instructor & Multi-Cloud Architect",
      instructor_bio: "Over 12 years designing and operating mission-critical distributed systems and enterprise cloud migrations.",
      skills: ["AWS SAA-C03", "EC2", "S3", "VPC", "IAM", "Route 53", "High Availability Architecture"],
      learning_points: [
        "Design high-availability VPC networks with public and private subnets.",
        "Choose optimal compute, storage, and database solutions for enterprise workloads.",
        "Implement IAM policies, security groups, and encryption at rest and in transit.",
        "Master Auto Scaling, Application Load Balancers, and multi-region failover."
      ]
    },
    pdfs: [
      { title: "AWS Core Infrastructure & Networking", module_title: "Module 1: Core Networking", summary: "Deep dive into VPC, subnets, route tables, and internet gateways." },
      { title: "Compute & Scalable Storage", module_title: "Module 2: Compute & Storage", summary: "EC2 instance types, EBS volumes, S3 storage tiers, and lifecycle rules." },
      { title: "High Availability & Disaster Recovery", module_title: "Module 3: Architecture Patterns", summary: "Multi-AZ architectures, Aurora clusters, and automated backups." }
    ]
  },
  {
    id: "c1000000-0000-4000-8000-000000000003",
    title: "AWS Certified Solutions Architect - Professional",
    price: 1050,
    is_published: true,
    thumbnail_url: "/courses/aws-solutions-architect-professional.png",
    description: "Advanced architecture patterns, multi-tier migrations, complex networking, and enterprise governance on AWS. Prepare for the prestigious AWS SAP-C02 certification.",
    metadata: {
      partner: "Eminence Career Solution",
      category: "Cloud",
      level: "Advanced",
      rating: 5.0,
      review_count: 8858,
      enrolled_count: 19500,
      duration_label: "45 Hours",
      subtitle: "Enterprise multi-account and hybrid cloud solutions on AWS.",
      instructor_name: "Principal Cloud Architect",
      instructor_title: "Principal Infrastructure Architect",
      instructor_bio: "Architected enterprise cloud landings for Fortune 500 banks and healthcare providers.",
      skills: ["AWS SAP-C02", "Transit Gateway", "Direct Connect", "Multi-Account Governance", "Disaster Recovery"],
      learning_points: [
        "Architect enterprise multi-account structures with AWS Organizations and Control Tower.",
        "Design hybrid network topologies using AWS Direct Connect and Transit Gateway.",
        "Implement RTO and RPO disaster recovery strategies across multiple regions.",
        "Optimize enterprise AWS spending using cost anomaly detection and savings plans."
      ]
    },
    pdfs: [
      { title: "Enterprise Account Architecture & Governance", module_title: "Module 1: Enterprise Accounts", summary: "AWS Organizations, SCPs, Control Tower, and IAM Identity Center." },
      { title: "Advanced Hybrid Cloud Networking", module_title: "Module 2: Hybrid Networking", summary: "Direct Connect, Transit Gateway peering, and Route 53 Resolver." },
      { title: "Complex Migrations & Multi-Region Strategies", module_title: "Module 3: Complex Migration", summary: "Database Migration Service, Application Migration Service, and failover." }
    ]
  },
  {
    id: "c1000000-0000-4000-8000-000000000004",
    title: "AWS Certified SysOps Administrator - Associate",
    price: 800,
    is_published: true,
    thumbnail_url: "/courses/aws-sysops-administrator-associate.png",
    description: "Deploy, manage, and operate scalable, highly available systems on AWS. Master CloudWatch monitoring, automated failover, security controls, and cost governance.",
    metadata: {
      partner: "Eminence Career Solution",
      category: "Cloud",
      level: "Intermediate",
      rating: 5.0,
      review_count: 9520,
      enrolled_count: 22100,
      duration_label: "35 Hours",
      subtitle: "System operations, automation, and infrastructure health on AWS.",
      instructor_name: "Site Reliability Director",
      instructor_title: "Senior SRE & AWS SysOps Specialist",
      instructor_bio: "Oversees 24/7 cloud reliability engineering and incident response for global scale workloads.",
      skills: ["AWS SOA-C02", "CloudWatch", "CloudFormation", "Systems Manager", "Automated Remediation"],
      learning_points: [
        "Monitor metrics and configure proactive CloudWatch alarms and synthetic monitors.",
        "Automate system patching, software deployment, and configuration via AWS Systems Manager.",
        "Troubleshoot network connectivity, security group rules, and latency bottlenecks.",
        "Manage data backups, lifecycle policies, and EBS snapshot lifecycle automation."
      ]
    },
    pdfs: [
      { title: "Monitoring, Metrics & Analysis", module_title: "Module 1: Monitoring", summary: "CloudWatch alarms, agent configuration, and custom metrics." },
      { title: "Fleet Management & Automation", module_title: "Module 2: Fleet Automation", summary: "Systems Manager Run Command, Patch Manager, and Parameter Store." },
      { title: "Troubleshooting & Incident Remediation", module_title: "Module 3: Troubleshooting", summary: "VPC Flow Logs, CloudTrail analysis, and automated remediation." }
    ]
  },
  {
    id: "c1000000-0000-4000-8000-000000000005",
    title: "AWS Certified Developer - Associate",
    price: 800,
    is_published: true,
    thumbnail_url: "/courses/aws-developer-associate.png",
    description: "Develop and deploy cloud-native applications using AWS Lambda, API Gateway, DynamoDB, and CI/CD pipelines. Clear the DVA-C02 certification with hands-on labs.",
    metadata: {
      partner: "Eminence Career Solution",
      category: "Developer",
      level: "Intermediate",
      rating: 5.0,
      review_count: 1662,
      enrolled_count: 18900,
      duration_label: "35 Hours",
      subtitle: "Build serverless and cloud-native applications on AWS.",
      instructor_name: "Senior Cloud Developer",
      instructor_title: "Serverless Architect & Full Stack Lead",
      instructor_bio: "Specialist in building zero-maintenance serverless microservices and event-driven architectures.",
      skills: ["AWS DVA-C02", "AWS Lambda", "DynamoDB", "API Gateway", "Cognito", "CodePipeline"],
      learning_points: [
        "Build serverless microservices using AWS Lambda and HTTP/REST API Gateway.",
        "Design single-table DynamoDB schemas with partition and sort keys.",
        "Authenticate users via Amazon Cognito user pools and federated identity.",
        "Instrument distributed tracing with AWS X-Ray and CloudWatch Logs."
      ]
    },
    pdfs: [
      { title: "Serverless Architecture & Lambda Execution", module_title: "Module 1: Serverless Compute", summary: "Lambda runtimes, concurrency limits, event sources, and layers." },
      { title: "NoSQL Data Modeling with DynamoDB", module_title: "Module 2: Data Store", summary: "Partition keys, Global Secondary Indexes, and query optimization." },
      { title: "Application Security & CI/CD Pipelines", module_title: "Module 3: CI/CD & Security", summary: "CodeBuild, CodeDeploy, AWS Secrets Manager, and KMS integration." }
    ]
  },
  {
    id: "c1000000-0000-4000-8000-000000000006",
    title: "AWS DevOps Certification",
    price: 900,
    is_published: true,
    thumbnail_url: "/courses/aws-devops-certification.png",
    description: "Provision and manage infrastructure using CodePipeline, CloudFormation, Docker, ECS, and observability tools. Master continuous delivery and security automation on AWS.",
    metadata: {
      partner: "Eminence Career Solution",
      category: "Cloud",
      level: "Advanced",
      rating: 5.0,
      review_count: 7596,
      enrolled_count: 24700,
      duration_label: "40 Hours",
      subtitle: "Continuous integration, delivery, and automated infrastructure on AWS.",
      instructor_name: "Staff DevOps Engineer",
      instructor_title: "DevOps & Platform Engineering Lead",
      instructor_bio: "Built automated GitOps CI/CD delivery pipelines deploying thousands of microservices daily.",
      skills: ["AWS DOP-C02", "CI/CD", "ECS", "CloudFormation", "Infrastructure as Code", "DevSecOps"],
      learning_points: [
        "Design multi-stage deployment pipelines with automated rollback capabilities.",
        "Implement Infrastructure as Code with reusable CloudFormation and Terraform modules.",
        "Run containerized microservices on Amazon ECS and AWS Fargate.",
        "Automate vulnerability scanning and compliance checks into build pipelines."
      ]
    },
    pdfs: [
      { title: "SDLC Automation & Pipeline Design", module_title: "Module 1: Automation", summary: "CodePipeline, multi-region deployments, and canary releases." },
      { title: "Infrastructure as Code & Configuration", module_title: "Module 2: IaC", summary: "CloudFormation templates, drift detection, and custom resources." },
      { title: "High Availability & Incident Response", module_title: "Module 3: SRE Practices", summary: "Event-driven automated healing, auto-scaling, and health checks." }
    ]
  },
  {
    id: "c1000000-0000-4000-8000-000000000007",
    title: "Microsoft Azure Certification Training Course for Azure Administrator: AZ-104",
    price: 600,
    is_published: true,
    thumbnail_url: "/courses/azure-administrator-az-104.png",
    description: "Implement, manage, and monitor Azure identity, governance, storage, compute, and virtual networks. Comprehensive prep for the Microsoft AZ-104 certification.",
    metadata: {
      partner: "Eminence Career Solution",
      category: "Cloud",
      level: "Intermediate",
      rating: 5.0,
      review_count: 862,
      enrolled_count: 31200,
      duration_label: "38 Hours",
      subtitle: "Configure and manage Azure enterprise cloud environments.",
      instructor_name: "Azure Certified Master",
      instructor_title: "Microsoft Certified Trainer (MCT) & Cloud Architect",
      instructor_bio: "Microsoft Certified Trainer with a decade of expertise delivering enterprise cloud adoption.",
      skills: ["AZ-104", "Microsoft Entra ID", "Azure VMs", "Virtual Networks", "Storage Accounts", "Azure Monitor"],
      learning_points: [
        "Manage Microsoft Entra ID identities, users, groups, and role-based access control (RBAC).",
        "Configure Azure virtual networks, peering, VPN gateways, and Network Security Groups (NSGs).",
        "Deploy and configure Azure VMs, availability sets, and scale sets.",
        "Configure Azure storage accounts, blob containers, file shares, and backup replication."
      ]
    },
    pdfs: [
      { title: "Identity & Governance in Azure", module_title: "Module 1: Identity", summary: "Entra ID, RBAC roles, Azure Policy, and management groups." },
      { title: "Virtual Networking & Compute Deployment", module_title: "Module 2: Networks & Compute", summary: "VNets, IP addressing, NSGs, and Azure Virtual Machines." },
      { title: "Storage, Backup & Cloud Monitoring", module_title: "Module 3: Storage & Monitor", summary: "Storage replication, Azure Backup, and Log Analytics queries." }
    ]
  },
  {
    id: "c1000000-0000-4000-8000-000000000008",
    title: "AZ 900 Microsoft Azure Fundamentals Certification Training",
    price: 600,
    is_published: true,
    thumbnail_url: "/courses/az-900-azure-fundamentals.png",
    description: "Foundational knowledge of cloud concepts, core Azure services, security, privacy, compliance, and Azure pricing. The perfect launching pad for any cloud career.",
    metadata: {
      partner: "Eminence Career Solution",
      category: "Cloud",
      level: "Beginner",
      rating: 5.0,
      review_count: 631,
      enrolled_count: 45000,
      duration_label: "20 Hours",
      subtitle: "Foundations of cloud computing and core Azure services.",
      instructor_name: "Microsoft Cloud Evangelist",
      instructor_title: "Cloud Consultant & MCT",
      instructor_bio: "Helps beginners transition into high-paying cloud roles with clear, jargon-free instruction.",
      skills: ["AZ-900", "Cloud Concepts", "Azure Architecture", "Security & Governance", "Cost Management"],
      learning_points: [
        "Understand differences between IaaS, PaaS, SaaS, and cloud models.",
        "Explore core Azure architectural components: regions, availability zones, and resource groups.",
        "Understand security, defense-in-depth, and compliance frameworks on Azure.",
        "Calculate Total Cost of Ownership (TCO) and optimize cloud expenditure."
      ]
    },
    pdfs: [
      { title: "Cloud Concepts & Azure Architecture", module_title: "Module 1: Cloud Concepts", summary: "IaaS, PaaS, SaaS, regions, and availability zones." },
      { title: "Core Services & Workloads", module_title: "Module 2: Core Services", summary: "Compute, networking, storage, and databases on Azure." },
      { title: "Security, Governance & Cost Tools", module_title: "Module 3: Security & Cost", summary: "Zero Trust, Azure Advisor, cost alerts, and SLAs." }
    ]
  },
  {
    id: "c1000000-0000-4000-8000-000000000009",
    title: "Microsoft Azure Infrastructure Solutions Certification Training for AZ-305",
    price: 900,
    is_published: true,
    thumbnail_url: "/courses/azure-solutions-az-305.png",
    description: "Design identity, governance, data storage, business continuity, and infrastructure solutions as a certified Azure Solutions Architect.",
    metadata: {
      partner: "Eminence Career Solution",
      category: "Cloud",
      level: "Advanced",
      rating: 5.0,
      review_count: 4412,
      enrolled_count: 17800,
      duration_label: "42 Hours",
      subtitle: "Design enterprise-grade infrastructure and governance on Azure.",
      instructor_name: "Enterprise Azure Architect",
      instructor_title: "Chief Cloud Architect",
      instructor_bio: "Architects zero-downtime mission-critical global infrastructures for enterprises worldwide.",
      skills: ["AZ-305", "Azure Architecture", "Disaster Recovery", "Zero Trust", "Data Platform Design"],
      learning_points: [
        "Design identity and governance architectures ensuring Zero Trust compliance.",
        "Architect data integration, relational and non-relational database storage solutions.",
        "Design business continuity solutions with Azure Site Recovery and geo-replication.",
        "Design migration roadmaps from on-premises datacenters to Azure."
      ]
    },
    pdfs: [
      { title: "Enterprise Identity & Governance Design", module_title: "Module 1: Governance", summary: "Conditional Access, Privileged Identity Management, and Policy." },
      { title: "Data Storage & Integration Architectures", module_title: "Module 2: Data Architecture", summary: "Cosmos DB consistency models, SQL Database tiers, and Data Lake." },
      { title: "High Availability & Business Continuity", module_title: "Module 3: Continuity", summary: "Azure Site Recovery, Traffic Manager, and Front Door routing." }
    ]
  },
  {
    id: "c1000000-0000-4000-8000-000000000010",
    title: "Microsoft Azure Developer Certification Associate AZ-204 Course",
    price: 700,
    is_published: true,
    thumbnail_url: "/courses/azure-developer-az-204.png",
    description: "Develop, test, and maintain cloud applications on Azure. Master Azure Functions, Cosmos DB, Azure App Service, Event Grid, and Service Bus messaging.",
    metadata: {
      partner: "Eminence Career Solution",
      category: "Developer",
      level: "Intermediate",
      rating: 5.0,
      review_count: 9395,
      enrolled_count: 26500,
      duration_label: "36 Hours",
      subtitle: "Build secure, scalable cloud applications with Azure PaaS.",
      instructor_name: "Principal Azure Engineer",
      instructor_title: "Cloud Software Architect",
      instructor_bio: "Specializes in building distributed microservices, message queues, and cloud event backends.",
      skills: ["AZ-204", "Azure Functions", "Cosmos DB", "App Services", "Key Vault", "Event Hubs"],
      learning_points: [
        "Develop event-driven serverless architectures with Azure Functions and triggers.",
        "Deploy and scale web apps and containers on Azure App Service.",
        "Integrate secure storage, secrets management with Azure Key Vault.",
        "Implement loosely-coupled message flows using Azure Service Bus and Event Grid."
      ]
    },
    pdfs: [
      { title: "Azure Compute Solutions & App Service", module_title: "Module 1: Compute", summary: "App Service plans, deployment slots, and container apps." },
      { title: "Serverless Functions & Event Architectures", module_title: "Module 2: Serverless", summary: "Azure Functions, durable functions, and Event Grid triggers." },
      { title: "Security, Secrets & Messaging Solutions", module_title: "Module 3: Messaging", summary: "Azure Key Vault, managed identities, and Service Bus queues." }
    ]
  },
  {
    id: "c1000000-0000-4000-8000-000000000011",
    title: "Microsoft Azure DevOps Engineer Certification Training for AZ-400",
    price: 900,
    is_published: true,
    thumbnail_url: "/courses/azure-devops-az-400.png",
    description: "Combine people, process, and technologies to deliver valuable cloud products. Master Azure Pipelines, Git branching strategies, Bicep/ARM templates, and automated testing.",
    metadata: {
      partner: "Eminence Career Solution",
      category: "Developer",
      level: "Advanced",
      rating: 5.0,
      review_count: 6292,
      enrolled_count: 21300,
      duration_label: "40 Hours",
      subtitle: "Design and implement enterprise DevOps practices using Azure Pipelines.",
      instructor_name: "Senior DevOps Architect",
      instructor_title: "DevOps Transformation Lead",
      instructor_bio: "Leads enterprise DevOps transformations and CI/CD automation across international engineering teams.",
      skills: ["AZ-400", "Azure Pipelines", "Git", "Bicep", "Infrastructure as Code", "Continuous Delivery"],
      learning_points: [
        "Design source control branching strategies and pull request quality gates.",
        "Create multi-stage YAML CI/CD pipelines with manual and automated approvals.",
        "Manage application configuration and secrets securely in deployment pipelines.",
        "Implement automated security scanning, container scanning, and dependency checks."
      ]
    },
    pdfs: [
      { title: "Source Control & Continuous Integration", module_title: "Module 1: CI", summary: "Azure Repos, branching strategies, and automated build pipelines." },
      { title: "Continuous Delivery & Release Management", module_title: "Module 2: CD", summary: "YAML deployment pipelines, environments, and approvals." },
      { title: "IaC with Bicep & DevSecOps Scanning", module_title: "Module 3: IaC & Security", summary: "Bicep templates, shift-left security, and SonarQube integration." }
    ]
  },
  {
    id: "c1000000-0000-4000-8000-000000000012",
    title: "Azure Data Factory Training for DP-203 Certification",
    price: 700,
    is_published: true,
    thumbnail_url: "/courses/azure-data-factory-dp-203.png",
    description: "Design and implement data storage, data processing, and security solutions. Master Azure Data Factory pipelines, Synapse Analytics, and Databricks workflows.",
    metadata: {
      partner: "Eminence Career Solution",
      category: "Developer",
      level: "Intermediate",
      rating: 5.0,
      review_count: 5311,
      enrolled_count: 19800,
      duration_label: "38 Hours",
      subtitle: "ETL data pipelines and lakehouse analytics on Microsoft Azure.",
      instructor_name: "Lead Data Engineer",
      instructor_title: "Big Data & Cloud Data Architect",
      instructor_bio: "Designs enterprise data platforms processing petabytes of real-time streaming and batch records.",
      skills: ["DP-203", "Azure Data Factory", "Azure Synapse", "Data Lake Storage", "Apache Spark", "Databricks"],
      learning_points: [
        "Build ETL/ELT pipelines with Azure Data Factory mapping data flows.",
        "Design scalable data lake partitions using Azure Data Lake Storage Gen2.",
        "Execute distributed data transformations using Apache Spark in Azure Synapse.",
        "Implement data security, column-level encryption, and row-level access control."
      ]
    },
    pdfs: [
      { title: "Azure Data Factory Pipeline Foundations", module_title: "Module 1: ADF Foundations", summary: "Linked services, datasets, activities, and pipeline orchestration." },
      { title: "Data Transformation with Synapse & Spark", module_title: "Module 2: Big Data", summary: "Mapping data flows, Synapse SQL pools, and Spark notebooks." },
      { title: "Security, Monitoring & Pipeline Optimization", module_title: "Module 3: Optimization", summary: "Data factory alerts, private endpoints, and pipeline performance." }
    ]
  },
  {
    id: "c1000000-0000-4000-8000-000000000013",
    title: "Microsoft Power BI Course",
    price: 800,
    is_published: true,
    thumbnail_url: "/courses/microsoft-power-bi.png",
    description: "Transform raw business data into interactive, real-time dashboards and reports. Master Power Query, DAX formulas, data modeling, and Power BI Service administration.",
    metadata: {
      partner: "Eminence Career Solution",
      category: "Developer",
      level: "Beginner",
      rating: 5.0,
      review_count: 3260,
      enrolled_count: 34100,
      duration_label: "30 Hours",
      subtitle: "Business intelligence, advanced DAX modeling, and visual analytics.",
      instructor_name: "Senior BI Consultant",
      instructor_title: "Microsoft Certified Power BI Data Analyst",
      instructor_bio: "Has delivered dozens of enterprise business intelligence dashboards for executive leadership.",
      skills: ["Power BI", "DAX", "Power Query", "Data Modeling", "Executive Dashboards", "KPI Tracking"],
      learning_points: [
        "Clean and transform messy data sources using Power Query (M code).",
        "Build star-schema relational data models with active and inactive relationships.",
        "Write advanced DAX calculations (CALCULATE, time intelligence, filters).",
        "Publish, share, and schedule automatic refreshes in Power BI Service."
      ]
    },
    pdfs: [
      { title: "Data Ingestion & Power Query Magic", module_title: "Module 1: Ingestion", summary: "Connecting to SQL, Excel, and Web APIs; data cleansing operations." },
      { title: "Data Modeling & Essential DAX", module_title: "Module 2: DAX Modeling", summary: "Star schemas, relationships, calculated columns, and measures." },
      { title: "Report Visualization & Power BI Service", module_title: "Module 3: Visual Analytics", summary: "Interactive visuals, drill-through, bookmarks, and mobile layouts." }
    ]
  },
  {
    id: "c1000000-0000-4000-8000-000000000014",
    title: "CISA Certification Training Course",
    price: 900,
    is_published: true,
    thumbnail_url: "/courses/cisa-certification.png",
    description: "Certified Information Systems Auditor (CISA) training covering IT governance, systems acquisition, operations, asset protection, and auditing practices.",
    metadata: {
      partner: "Eminence Career Solution",
      category: "Cyber Security",
      level: "Advanced",
      rating: 5.0,
      review_count: 9258,
      enrolled_count: 16400,
      duration_label: "40 Hours",
      subtitle: "The globally gold standard for information systems audit and control.",
      instructor_name: "Chief Audit Executive",
      instructor_title: "CISA, CISM, CRISC Certified IT Auditor",
      instructor_bio: "Senior IT auditor with over 18 years conducting compliance and cybersecurity risk assessments.",
      skills: ["ISACA CISA", "IT Audit", "Governance & Management of IT", "Information Asset Protection", "Risk Assessment"],
      learning_points: [
        "Plan and execute audit engagements in accordance with ISACA standards.",
        "Evaluate enterprise IT governance and organizational structures.",
        "Audit systems acquisition, development, and implementation lifecycles.",
        "Assess information asset security controls, encryption, and incident response."
      ]
    },
    pdfs: [
      { title: "Information System Auditing Process", module_title: "Module 1: Audit Standards", summary: "ISACA code of ethics, audit charters, and risk-based audit planning." },
      { title: "Governance & Management of IT", module_title: "Module 2: Governance", summary: "IT strategy alignment, risk management frameworks, and policies." },
      { title: "Protection of Information Assets", module_title: "Module 3: Asset Protection", summary: "Logical access controls, network security audits, and DR testing." }
    ]
  },
  {
    id: "c1000000-0000-4000-8000-000000000015",
    title: "CISM Certification Training",
    price: 900,
    is_published: true,
    thumbnail_url: "/courses/cism-certification.png",
    description: "Certified Information Security Manager (CISM) program focusing on information security governance, incident management, program development, and risk management.",
    metadata: {
      partner: "Eminence Career Solution",
      category: "Cyber Security",
      level: "Advanced",
      rating: 5.0,
      review_count: 1425,
      enrolled_count: 14300,
      duration_label: "38 Hours",
      subtitle: "Security management, governance, and enterprise cyber risk.",
      instructor_name: "Chief Information Security Officer",
      instructor_title: "Enterprise CISO & ISACA Fellow",
      instructor_bio: "CISO who has built and led global cybersecurity programs across regulated banking and healthcare environments.",
      skills: ["ISACA CISM", "Information Security Governance", "Risk Management", "Incident Response", "Compliance"],
      learning_points: [
        "Establish and maintain an information security governance framework.",
        "Assess, treat, and monitor information security risk aligned with business goals.",
        "Develop and oversee an enterprise-wide information security program.",
        "Design disaster recovery, incident containment, and post-incident investigation plans."
      ]
    },
    pdfs: [
      { title: "Information Security Governance Strategy", module_title: "Module 1: Governance", summary: "Aligning security strategy with business objectives and compliance." },
      { title: "Information Risk Management", module_title: "Module 2: Risk Treatment", summary: "Risk identification, impact analysis, and mitigation controls." },
      { title: "Incident Management & Business Resilience", module_title: "Module 3: Incident Response", summary: "Incident response teams, containment protocols, and forensic evidence." }
    ]
  },
  {
    id: "c1000000-0000-4000-8000-000000000016",
    title: "CompTIA-SY0-601-Security+ Course",
    price: 900,
    is_published: true,
    thumbnail_url: "/courses/comptia-security-plus.png",
    description: "The baseline cybersecurity certification. Master network security, threat analysis, cryptography, identity management, and incident response procedures.",
    metadata: {
      partner: "Eminence Career Solution",
      category: "Cyber Security",
      level: "Beginner",
      rating: 5.0,
      review_count: 5409,
      enrolled_count: 38700,
      duration_label: "35 Hours",
      subtitle: "Core cybersecurity skills to defend enterprise networks and systems.",
      instructor_name: "Cybersecurity Director",
      instructor_title: "CompTIA Certified Instructor & Threat Analyst",
      instructor_bio: "Trained thousands of cybersecurity analysts on frontline defense and penetration analysis.",
      skills: ["CompTIA Security+", "Threat Analysis", "Cryptography", "Identity & Access", "Network Security", "Vulnerability Management"],
      learning_points: [
        "Identify and analyze attack vectors, malware, phishing, and social engineering threats.",
        "Implement public key infrastructure (PKI), TLS, and cryptographic algorithms.",
        "Secure enterprise cloud, wireless, and wired network infrastructure.",
        "Conduct basic security assessments and vulnerability scans."
      ]
    },
    pdfs: [
      { title: "Threats, Attacks & Vulnerabilities", module_title: "Module 1: Threats", summary: "Social engineering, malware families, and vulnerability scanning." },
      { title: "Architecture & Defensive Design", module_title: "Module 2: Defensive Design", summary: "Network segmentation, firewalls, SIEM, and zero-trust design." },
      { title: "Identity, Access & Cryptography", module_title: "Module 3: Cryptography", summary: "MFA, PKI certificates, symmetric vs asymmetric encryption." }
    ]
  },
  {
    id: "c1000000-0000-4000-8000-000000000017",
    title: "CompTIA Network+ (N10-008) Course",
    price: 900,
    is_published: true,
    thumbnail_url: "/courses/comptia-network-plus.png",
    description: "Design, configure, manage, and troubleshoot enterprise wired and wireless devices. Master OSI model, TCP/IP, routing protocols, and network resilience.",
    metadata: {
      partner: "Eminence Career Solution",
      category: "Cyber Security",
      level: "Beginner",
      rating: 5.0,
      review_count: 5875,
      enrolled_count: 29400,
      duration_label: "35 Hours",
      subtitle: "Foundations of enterprise network engineering and troubleshooting.",
      instructor_name: "Senior Network Engineer",
      instructor_title: "CCNP & CompTIA Network+ Master Instructor",
      instructor_bio: "Expert network engineer with over 14 years designing high-speed campus and datacenter networks.",
      skills: ["CompTIA Network+", "TCP/IP", "Subnetting", "Routing & Switching", "Network Troubleshooting", "Wireless Networks"],
      learning_points: [
        "Explain the 7 layers of the OSI model and real-world encapsulation.",
        "Calculate IPv4 subnets and configure IPv6 addressing schemes.",
        "Deploy and configure switches, routers, VLANs, and wireless access points.",
        "Use CLI diagnostic tools (traceroute, ping, tcpdump) to troubleshoot connection drops."
      ]
    },
    pdfs: [
      { title: "Networking Fundamentals & The OSI Model", module_title: "Module 1: Fundamentals", summary: "OSI layers, ports and protocols, IPv4 and IPv6 subnetting." },
      { title: "Network Implementations & Routing", module_title: "Module 2: Routing & Switching", summary: "VLANs, trunking, dynamic routing protocols (OSPF, BGP)." },
      { title: "Network Security & Troubleshooting", module_title: "Module 3: Troubleshooting", summary: "Troubleshooting methodology, cable testing, and wireless security." }
    ]
  },
  {
    id: "c1000000-0000-4000-8000-000000000018",
    title: "CompTIA A+ 1101-1102 Course",
    price: 1200,
    is_published: true,
    thumbnail_url: "/courses/comptia-a-plus.png",
    description: "The industry standard for launching IT careers. Covers hardware, mobile devices, networking technology, operating systems, security, and operational procedures.",
    metadata: {
      partner: "Eminence Career Solution",
      category: "Cyber Security",
      level: "Beginner",
      rating: 5.0,
      review_count: 6146,
      enrolled_count: 42100,
      duration_label: "45 Hours",
      subtitle: "Hardware, systems administration, and end-user technical support.",
      instructor_name: "IT Support Operations Lead",
      instructor_title: "IT Operations Director & CompTIA Instructor",
      instructor_bio: "Has helped thousands of candidates successfully break into the tech industry as system admins.",
      skills: ["CompTIA A+", "PC Hardware", "Windows / Linux / macOS", "Troubleshooting", "Virtualization", "Cloud Foundations"],
      learning_points: [
        "Assemble, configure, and troubleshoot desktop and laptop hardware components.",
        "Install, configure, and optimize Windows, macOS, and Linux operating systems.",
        "Configure small-office/home-office (SOHO) networks and peripheral equipment.",
        "Execute disaster recovery, operational best practices, and ticket resolutions."
      ]
    },
    pdfs: [
      { title: "Core Hardware & Peripheral Components", module_title: "Module 1: Core Hardware", summary: "Motherboards, CPUs, RAM, power supplies, and storage devices." },
      { title: "Operating Systems & Software Troubleshooting", module_title: "Module 2: Operating Systems", summary: "Windows installation, command-line tools, and system recovery." },
      { title: "Operational Procedures & Security Basics", module_title: "Module 3: Security & Support", summary: "Antivirus, permissions, ticketing systems, and customer communication." }
    ]
  },
  {
    id: "c1000000-0000-4000-8000-000000000019",
    title: "CompTIA Cybersecurity Analyst (CySA+) Course",
    price: 1200,
    is_published: true,
    thumbnail_url: "/courses/comptia-cysa-plus.png",
    description: "Apply behavioral analytics to networks and devices to prevent, detect, and combat cybersecurity threats through continuous security monitoring.",
    metadata: {
      partner: "Eminence Career Solution",
      category: "Cyber Security",
      level: "Intermediate",
      rating: 5.0,
      review_count: 8610,
      enrolled_count: 23600,
      duration_label: "40 Hours",
      subtitle: "Threat intelligence, behavioral analytics, and incident response.",
      instructor_name: "Principal SOC Analyst",
      instructor_title: "Senior Cyber Threat Intelligence Lead",
      instructor_bio: "Specializes in threat hunting, malware reverse-engineering, and managing Tier-3 SOC operations.",
      skills: ["CompTIA CySA+", "Threat Intelligence", "Vulnerability Assessment", "SIEM Monitoring", "Incident Response"],
      learning_points: [
        "Analyze threat intelligence indicators (IoCs) and apply MITRE ATT&CK frameworks.",
        "Operate SIEM platforms to detect suspicious anomalous behavior.",
        "Conduct thorough vulnerability management and patch prioritization.",
        "Execute incident response containment, eradication, and post-mortem analysis."
      ]
    },
    pdfs: [
      { title: "Threat & Vulnerability Management", module_title: "Module 1: Threat Analysis", summary: "Threat actors, intelligence feeds, and vulnerability scanning." },
      { title: "Security Operations & Monitoring", module_title: "Module 2: SOC Monitoring", summary: "SIEM rule tuning, log correlation, and endpoint detection." },
      { title: "Incident Response Procedures", module_title: "Module 3: Incident Response", summary: "Containment techniques, eradication, and lessons learned." }
    ]
  },
  {
    id: "c1000000-0000-4000-8000-000000000020",
    title: "CompTIA Advanced Security Practitioner (CASP+) (CAS-004) Course",
    price: 1200,
    is_published: true,
    thumbnail_url: "/courses/comptia-casp-plus.png",
    description: "Advanced cybersecurity certification for technical experts who wish to lead engineering, architecture, and cryptographic defense without becoming pure managers.",
    metadata: {
      partner: "Eminence Career Solution",
      category: "Cyber Security",
      level: "Advanced",
      rating: 5.0,
      review_count: 8792,
      enrolled_count: 18200,
      duration_label: "45 Hours",
      subtitle: "Enterprise security architecture, engineering, and cryptography.",
      instructor_name: "Lead Cyber Architect",
      instructor_title: "Distinguished Enterprise Security Architect",
      instructor_bio: "Leads technical security architecture for defense contractors and critical infrastructure networks.",
      skills: ["CompTIA CASP+", "Enterprise Security Architecture", "Applied Cryptography", "Cloud & Hybrid Security", "Risk Mitigation"],
      learning_points: [
        "Architect enterprise security across on-premises, cloud, and hybrid environments.",
        "Implement advanced cryptographic techniques (zero-knowledge proofs, quantum-resistant algorithms).",
        "Perform advanced threat hunting and complex incident analysis.",
        "Integrate security into enterprise architecture pipelines and operational lifecycles."
      ]
    },
    pdfs: [
      { title: "Enterprise Security Architecture", module_title: "Module 1: Architecture", summary: "Zero Trust, network micro-segmentation, and cloud security design." },
      { title: "Applied Cryptography & PKI", module_title: "Module 2: Cryptography", summary: "Cryptographic protocols, key lifecycle management, and quantum resilience." },
      { title: "Enterprise Security Operations", module_title: "Module 3: SecOps Engineering", summary: "Threat hunting, behavioral analysis, and automated orchestration (SOAR)." }
    ]
  }
];

async function seed() {
  console.log("Starting database synchronization for the 20 actual courses...");

  // 1. Delete all existing course_pdfs
  console.log("Removing old course_pdfs...");
  await supabase.from("course_pdfs").delete().neq("id", "00000000-0000-0000-0000-000000000000");

  // 2. Remove old purchases or let them cascade
  console.log("Clearing old test purchases...");
  await supabase.from("purchases").delete().neq("id", "00000000-0000-0000-0000-000000000000");

  // 3. Delete old courses
  console.log("Removing old course records...");
  await supabase.from("courses").delete().neq("id", "00000000-0000-0000-0000-000000000000");

  // 4. Insert the 20 actual courses
  console.log("Inserting 20 actual courses...");
  const coursesToInsert = COURSES.map(c => ({
    id: c.id,
    title: c.title,
    description: c.description,
    thumbnail_url: c.thumbnail_url,
    price: c.price,
    is_published: c.is_published,
    created_by: ADMIN_ID,
    metadata: c.metadata,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }));

  const { error: insertError } = await supabase.from("courses").insert(coursesToInsert);
  if (insertError) {
    console.error("Failed to insert courses:", insertError);
    process.exit(1);
  }
  console.log("Inserted 20 courses successfully!");

  // 5. Insert PDFs for each course
  console.log("Inserting lesson PDFs for each course...");
  const pdfsToInsert = [];
  for (const c of COURSES) {
    let order = 1;
    for (const p of c.pdfs) {
      pdfsToInsert.push({
        id: crypto.randomUUID(),
        course_id: c.id,
        title: p.title,
        module_title: p.module_title,
        summary: p.summary,
        file_path: `https://example.com/handouts/${c.id}.pdf`,
        sort_order: order++,
        created_at: new Date().toISOString()
      });
    }
  }

  const { error: pdfError } = await supabase.from("course_pdfs").insert(pdfsToInsert);
  if (pdfError) {
    console.error("Failed to insert PDFs:", pdfError);
    process.exit(1);
  }
  console.log(`Inserted ${pdfsToInsert.length} course PDFs successfully!`);

  console.log("Database update complete!");
}

seed();
