#!/usr/bin/env python3
"""
🧠 GATEWAY INTELLIGENCE CORE v1.0
Self-Updating AI Consciousness System

This module automatically discovers, maps, and updates knowledge about 
The Everything Gateway by analyzing the actual site structure, content,
and data files - ensuring the AI is ALWAYS current with zero maintenance.
"""

import os
import json
import time
from datetime import datetime
from pathlib import Path
from typing import Dict, List, Any, Optional
from dataclasses import dataclass, asdict
import hashlib
import re
from urllib.parse import urljoin
import requests
from bs4 import BeautifulSoup

@dataclass
class GatewayNode:
    """Canonical schema for all Gateway knowledge elements"""
    id: str
    type: str  # 'category', 'resource', 'page', 'section'
    title: str
    description: str
    url: Optional[str] = None
    tags: List[str] = None
    metadata: Dict[str, Any] = None
    parent_id: Optional[str] = None
    children_ids: List[str] = None
    last_modified: str = None
    content_hash: str = None
    
    def __post_init__(self):
        if self.tags is None:
            self.tags = []
        if self.metadata is None:
            self.metadata = {}
        if self.children_ids is None:
            self.children_ids = []
        if self.last_modified is None:
            self.last_modified = datetime.now().isoformat()


class GatewayIntelligenceCore:
    """
    🧠 Self-updating AI consciousness that learns from the actual site
    """
    
    def __init__(self, project_root: str, deployed_url: str = None):
        self.project_root = Path(project_root)
        self.deployed_url = deployed_url or "https://cheery-flan-dc1088.netlify.app"
        
        # Intelligence storage
        self.ai_dir = self.project_root / "ai"
        self.knowledge_base_path = self.ai_dir / "gateway_knowledge.json"
        self.site_map_path = self.ai_dir / "site_map.json"
        self.change_log_path = self.ai_dir / "intelligence_log.json"
        
        # Ensure AI directory exists
        self.ai_dir.mkdir(exist_ok=True)
        
        # Knowledge graph
        self.nodes: Dict[str, GatewayNode] = {}
        self.last_scan_time = None
        self.content_hashes = {}
        
    def get_file_hash(self, file_path: Path) -> str:
        """Generate hash for file content to detect changes"""
        try:
            content = file_path.read_text(encoding='utf-8')
            return hashlib.md5(content.encode()).hexdigest()
        except Exception as e:
            return f"error:{str(e)}"
    
    def scan_local_repository(self) -> Dict[str, Any]:
        """
        🔍 Crawl the local repository structure and extract all knowledge
        """
        print("🔍 Scanning local repository structure...")
        
        scan_results = {
            "timestamp": datetime.now().isoformat(),
            "categories_discovered": [],
            "pages_discovered": [],
            "data_files_discovered": [],
            "resources_discovered": []
        }
        
        # 1. Scan data directory for JSON files
        data_dir = self.project_root / "data"
        if data_dir.exists():
            for json_file in data_dir.glob("*.json"):
                file_hash = self.get_file_hash(json_file)
                print(f"  📄 Found data file: {json_file.name}")
                
                try:
                    data = json.loads(json_file.read_text(encoding='utf-8'))
                    scan_results["data_files_discovered"].append({
                        "file": json_file.name,
                        "path": str(json_file),
                        "hash": file_hash,
                        "structure": self._analyze_json_structure(data)
                    })
                    
                    # Process categories.json specially
                    if json_file.name == "categories.json":
                        self._process_categories_data(data)
                        
                except json.JSONDecodeError as e:
                    print(f"  ❌ Failed to parse {json_file.name}: {e}")
        
        # 2. Scan categories directory for HTML pages
        categories_dir = self.project_root / "categories"
        if categories_dir.exists():
            for category_dir in categories_dir.iterdir():
                if category_dir.is_dir():
                    index_file = category_dir / "index.html"
                    if index_file.exists():
                        file_hash = self.get_file_hash(index_file)
                        print(f"  🌐 Found category page: {category_dir.name}")
                        
                        page_data = self._analyze_html_page(index_file)
                        scan_results["pages_discovered"].append({
                            "category": category_dir.name,
                            "path": str(index_file),
                            "hash": file_hash,
                            "analysis": page_data
                        })
        
        # 3. Scan root index.html
        root_index = self.project_root / "index.html"
        if root_index.exists():
            file_hash = self.get_file_hash(root_index)
            page_data = self._analyze_html_page(root_index)
            scan_results["pages_discovered"].append({
                "category": "main_gateway",
                "path": str(root_index),
                "hash": file_hash,
                "analysis": page_data
            })
        
        return scan_results
    
    def _analyze_json_structure(self, data: Dict[str, Any]) -> Dict[str, Any]:
        """Analyze JSON structure to understand content"""
        structure = {
            "top_level_keys": list(data.keys()),
            "estimated_items": 0,
            "data_types": {}
        }
        
        for key, value in data.items():
            if isinstance(value, list):
                structure["estimated_items"] += len(value)
                structure["data_types"][key] = f"array[{len(value)}]"
            elif isinstance(value, dict):
                structure["data_types"][key] = f"object[{len(value)}]"
            else:
                structure["data_types"][key] = type(value).__name__
                
        return structure
    
    def _analyze_html_page(self, html_path: Path) -> Dict[str, Any]:
        """Analyze HTML page to extract structure and content"""
        try:
            content = html_path.read_text(encoding='utf-8')
            soup = BeautifulSoup(content, 'html.parser')
            
            analysis = {
                "title": soup.title.string if soup.title else "No title",
                "meta_description": "",
                "headings": [],
                "sections": [],
                "links": [],
                "categories_found": 0
            }
            
            # Extract meta description
            meta_desc = soup.find("meta", attrs={"name": "description"})
            if meta_desc:
                analysis["meta_description"] = meta_desc.get("content", "")
            
            # Extract headings
            for heading in soup.find_all(["h1", "h2", "h3", "h4"]):
                analysis["headings"].append({
                    "level": heading.name,
                    "text": heading.get_text().strip()
                })
            
            # Extract category cards/sections
            category_cards = soup.find_all(class_=lambda x: x and "category" in x)
            analysis["categories_found"] = len(category_cards)
            
            # Extract all links
            for link in soup.find_all("a", href=True):
                href = link["href"]
                text = link.get_text().strip()
                if text and not href.startswith("#"):
                    analysis["links"].append({
                        "text": text,
                        "href": href,
                        "is_internal": not href.startswith("http")
                    })
            
            return analysis
            
        except Exception as e:
            return {"error": str(e)}
    
    def _process_categories_data(self, categories_data: Dict[str, Any]):
        """Process categories.json to create knowledge nodes"""
        if "categories" in categories_data:
            for category in categories_data["categories"]:
                node_id = f"category_{category['id']}"
                
                node = GatewayNode(
                    id=node_id,
                    type="category",
                    title=category["name"],
                    description=category.get("description", ""),
                    url=category.get("path", ""),
                    tags=category.get("tags", []),
                    metadata={
                        "emoji": category.get("emoji", ""),
                        "color": category.get("color", ""),
                        "gradient": category.get("gradient", ""),
                        "status": category.get("status", ""),
                        "count": category.get("count", 0),
                        "featured": category.get("featured", False)
                    }
                )
                
                self.nodes[node_id] = node
                print(f"  🏷️ Created node: {category['name']} ({category.get('count', 0)} resources)")
    
    def generate_ai_knowledge_base(self) -> Dict[str, Any]:
        """
        🧠 Generate the core knowledge base for AI consumption
        """
        print("🧠 Generating AI knowledge base...")
        
        knowledge_base = {
            "generated_at": datetime.now().isoformat(),
            "gateway_identity": {
                "name": "The Everything Gateway",
                "purpose": "Your single portal to the entire internet",
                "total_categories": len([n for n in self.nodes.values() if n.type == "category"]),
                "total_resources": sum(n.metadata.get("count", 0) for n in self.nodes.values() if n.type == "category"),
                "url": self.deployed_url,
                "description": "Beautifully organized access to search engines, tools, entertainment, knowledge, and more"
            },
            "categories": {},
            "quick_answers": {},
            "navigation_help": {},
            "common_queries": {}
        }
        
        # Build categories section
        for node in self.nodes.values():
            if node.type == "category":
                knowledge_base["categories"][node.id] = {
                    "name": node.title,
                    "description": node.description,
                    "emoji": node.metadata.get("emoji", ""),
                    "url": node.url,
                    "resource_count": node.metadata.get("count", 0),
                    "tags": node.tags,
                    "status": node.metadata.get("status", "active")
                }
        
        # Generate quick answers for common questions
        knowledge_base["quick_answers"] = {
            "what_is_this": f"The Everything Gateway is your single portal to the entire internet with {knowledge_base['gateway_identity']['total_resources']}+ resources across {knowledge_base['gateway_identity']['total_categories']} categories.",
            "how_many_categories": f"We have {knowledge_base['gateway_identity']['total_categories']} categories covering everything from search engines to entertainment to productivity tools.",
            "how_many_resources": f"Over {knowledge_base['gateway_identity']['total_resources']} carefully curated resources across all categories.",
            "whats_new": "Check our latest updates and new categories like Hidden Treasures with exclusive tools.",
            "how_to_search": "Use Ctrl+K to open universal search, or click the search button to find anything across all platforms.",
            "categories_list": ", ".join([node.title for node in self.nodes.values() if node.type == "category"])
        }
        
        # Navigation help
        knowledge_base["navigation_help"] = {
            "search_shortcut": "Press Ctrl+K to open universal search",
            "mobile_search": "Tap the floating search button on mobile",
            "category_access": "Click any category card to explore its resources",
            "favorites": "Heart icon to save your favorite platforms",
            "breadcrumbs": "Use breadcrumb navigation to go back"
        }
        
        # Common user queries and responses
        knowledge_base["common_queries"] = {
            "ai_tools": "You can find AI tools in the Tools & Utilities category, AI & ML section",
            "search_engines": "The Search Engines category has 39+ search engines across 9 different types",
            "entertainment": "Check Entertainment & Media for streaming, music, and gaming platforms",
            "pdf_tools": "PDF utilities are in the Tools & Utilities category, PDF Tools section",
            "design_tools": "Design & Creativity category has professional design tools and resources",
            "crypto": "Crypto & Blockchain category covers trading, DeFi, NFTs, and analytics",
            "anime": "Anime & Manga category has streaming platforms, manga readers, and databases",
            "gaming": "Gaming & Esports category includes game stores, streaming, and communities",
            "news": "News & Trends category has global news sources and tech publications",
            "social": "Social Networks category includes social media, forums, and communication tools"
        }
        
        return knowledge_base
    
    def update_intelligence(self) -> Dict[str, Any]:
        """
        🔄 Full intelligence update cycle
        """
        print("🔄 Starting full intelligence update...")
        
        update_log = {
            "timestamp": datetime.now().isoformat(),
            "changes_detected": [],
            "nodes_updated": 0,
            "scan_duration": 0
        }
        
        start_time = time.time()
        
        # 1. Scan repository
        scan_results = self.scan_local_repository()
        
        # 2. Generate knowledge base
        knowledge_base = self.generate_ai_knowledge_base()
        
        # 3. Save knowledge base
        with open(self.knowledge_base_path, 'w', encoding='utf-8') as f:
            json.dump(knowledge_base, f, indent=2, ensure_ascii=False)
        
        # 4. Save scan results
        with open(self.site_map_path, 'w', encoding='utf-8') as f:
            json.dump(scan_results, f, indent=2, ensure_ascii=False)
        
        update_log["scan_duration"] = time.time() - start_time
        update_log["nodes_updated"] = len(self.nodes)
        
        # 5. Save update log
        with open(self.change_log_path, 'w', encoding='utf-8') as f:
            json.dump(update_log, f, indent=2, ensure_ascii=False)
        
        print(f"✅ Intelligence update complete! {len(self.nodes)} nodes processed in {update_log['scan_duration']:.2f}s")
        return update_log
    
    def get_answer(self, question: str) -> str:
        """
        🤖 Answer user questions based on current knowledge
        """
        if not self.knowledge_base_path.exists():
            return "I need to scan the Gateway first. Let me learn about the site..."
        
        try:
            with open(self.knowledge_base_path, 'r', encoding='utf-8') as f:
                kb = json.load(f)
            
            question_lower = question.lower()
            
            # Check common queries first
            for key, answer in kb.get("common_queries", {}).items():
                if key in question_lower or any(word in question_lower for word in key.split('_')):
                    return answer
            
            # Check quick answers
            for key, answer in kb.get("quick_answers", {}).items():
                if any(word in question_lower for word in key.split('_')):
                    return answer
            
            # Search categories
            for cat_id, cat_info in kb.get("categories", {}).items():
                cat_name = cat_info["name"].lower()
                if cat_name in question_lower or any(tag in question_lower for tag in cat_info.get("tags", [])):
                    return f"The {cat_info['name']} category has {cat_info['resource_count']} resources. {cat_info['description']}"
            
            return f"I found information about The Everything Gateway with {kb['gateway_identity']['total_resources']}+ resources across {kb['gateway_identity']['total_categories']} categories. What specific area are you interested in?"
            
        except Exception as e:
            return f"I'm having trouble accessing my knowledge right now: {str(e)}"


if __name__ == "__main__":
    # Initialize and run intelligence update
    print("🚀 Gateway Intelligence Core - Starting...")
    
    project_root = Path(__file__).parent.parent  # everything-gateway directory
    intelligence = GatewayIntelligenceCore(str(project_root))
    
    # Run full update
    result = intelligence.update_intelligence()
    
    print(f"\n🎉 Intelligence Core initialized!")
    print(f"📊 Knowledge base: {intelligence.knowledge_base_path}")
    print(f"🗺️ Site map: {intelligence.site_map_path}")
    print(f"📝 Change log: {intelligence.change_log_path}")
    
    # Test question answering
    test_questions = [
        "What is this site?",
        "How many categories do you have?",
        "Where can I find AI tools?",
        "Show me design resources"
    ]
    
    print(f"\n🧠 Testing AI responses:")
    for question in test_questions:
        answer = intelligence.get_answer(question)
        print(f"Q: {question}")
        print(f"A: {answer}\n")
