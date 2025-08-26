#!/usr/bin/env python3
"""
🔄 GATEWAY AUTO-UPDATE WATCHER v1.0
Filesystem Monitoring for Self-Updating AI Consciousness

This module watches for changes in your Gateway project and automatically
updates the AI knowledge base whenever you modify data files or pages.
The AI stays current with ZERO manual intervention!
"""

import os
import time
import json
from datetime import datetime
from pathlib import Path
from typing import Dict, Set, Any
import hashlib
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler

from gateway_intelligence_core import GatewayIntelligenceCore

class GatewayChangeHandler(FileSystemEventHandler):
    """
    🔍 Handles filesystem events and triggers AI updates
    """
    
    def __init__(self, intelligence_core: GatewayIntelligenceCore):
        super().__init__()
        self.intelligence = intelligence_core
        self.last_update = time.time()
        self.update_cooldown = 5.0  # Seconds to wait between updates
        self.pending_changes = set()
        
        # Files we care about
        self.watched_extensions = {'.json', '.html', '.md', '.js', '.css'}
        self.watched_directories = {'data', 'categories', 'css', 'js'}
        
        print("🔍 Auto-update watcher initialized")
        print(f"📁 Watching: {', '.join(self.watched_directories)}")
        print(f"📄 Extensions: {', '.join(self.watched_extensions)}")
    
    def should_trigger_update(self, file_path: Path) -> bool:
        """
        🎯 Determine if a file change should trigger AI update
        """
        # Check if file extension is relevant
        if file_path.suffix not in self.watched_extensions:
            return False
            
        # Check if it's in a watched directory
        parts = file_path.parts
        for part in parts:
            if part in self.watched_directories:
                return True
                
        # Check if it's a root file we care about
        if file_path.name in {'index.html', 'README.md'}:
            return True
            
        return False
    
    def on_modified(self, event):
        """Handle file modification events"""
        if event.is_directory:
            return
            
        file_path = Path(event.src_path)
        
        if self.should_trigger_update(file_path):
            self.pending_changes.add(str(file_path))
            print(f"📝 Change detected: {file_path.name}")
            self.schedule_update()
    
    def on_created(self, event):
        """Handle file creation events"""
        if event.is_directory:
            return
            
        file_path = Path(event.src_path)
        
        if self.should_trigger_update(file_path):
            self.pending_changes.add(str(file_path))
            print(f"➕ New file detected: {file_path.name}")
            self.schedule_update()
    
    def on_deleted(self, event):
        """Handle file deletion events"""
        if event.is_directory:
            return
            
        file_path = Path(event.src_path)
        
        if self.should_trigger_update(file_path):
            self.pending_changes.add(str(file_path))
            print(f"🗑️ File deleted: {file_path.name}")
            self.schedule_update()
    
    def schedule_update(self):
        """
        ⏰ Schedule an AI update with cooldown to avoid spam
        """
        current_time = time.time()
        
        if current_time - self.last_update >= self.update_cooldown:
            self.trigger_update()
        else:
            # Update is already scheduled or too recent
            pass
    
    def trigger_update(self):
        """
        🚀 Trigger the AI intelligence update
        """
        if not self.pending_changes:
            return
            
        print(f"\n🧠 Triggering AI update for {len(self.pending_changes)} changes...")
        
        try:
            # Run the intelligence update
            result = self.intelligence.update_intelligence()
            
            # Log the successful update
            update_log = {
                "timestamp": datetime.now().isoformat(),
                "trigger": "file_change_watcher",
                "files_changed": list(self.pending_changes),
                "update_duration": result.get("scan_duration", 0),
                "nodes_updated": result.get("nodes_updated", 0)
            }
            
            # Save update log
            log_path = self.intelligence.ai_dir / "auto_update_log.json"
            with open(log_path, 'a', encoding='utf-8') as f:
                f.write(json.dumps(update_log) + '\n')
            
            print(f"✅ AI updated successfully! {result.get('nodes_updated', 0)} nodes processed")
            print(f"⏱️ Update took {result.get('scan_duration', 0):.2f} seconds")
            
            # Clear pending changes
            self.pending_changes.clear()
            self.last_update = time.time()
            
        except Exception as e:
            print(f"❌ AI update failed: {str(e)}")
            # Keep pending changes for retry
    

class GatewayAutoUpdater:
    """
    🤖 Main auto-updater that orchestrates filesystem watching
    """
    
    def __init__(self, project_root: str):
        self.project_root = Path(project_root)
        
        # Initialize intelligence core
        self.intelligence = GatewayIntelligenceCore(project_root)
        
        # Initialize file watcher
        self.observer = Observer()
        self.handler = GatewayChangeHandler(self.intelligence)
        
        # Watch the project directory
        self.observer.schedule(
            self.handler,
            str(self.project_root),
            recursive=True
        )
        
        print(f"📁 Watching directory: {self.project_root}")
        
    def start(self):
        """
        🚀 Start the auto-update system
        """
        print("🔄 Starting Gateway Auto-Update System...")
        
        # Do an initial intelligence update
        print("🧠 Performing initial intelligence scan...")
        initial_result = self.intelligence.update_intelligence()
        print(f"✅ Initial scan complete: {initial_result.get('nodes_updated', 0)} nodes")
        
        # Start watching for changes
        self.observer.start()
        print("👀 Now watching for changes...")
        print("🔄 AI will auto-update when you modify files!")
        print("📝 Press Ctrl+C to stop")
        
        try:
            while True:
                time.sleep(1)
        except KeyboardInterrupt:
            self.stop()
    
    def stop(self):
        """
        🛑 Stop the auto-update system
        """
        print("\n🛑 Stopping Gateway Auto-Update System...")
        self.observer.stop()
        self.observer.join()
        print("✅ Auto-updater stopped")
    
    def get_status(self) -> Dict[str, Any]:
        """
        📊 Get current status of the auto-update system
        """
        status = {
            "running": self.observer.is_alive(),
            "project_root": str(self.project_root),
            "last_update": getattr(self.handler, 'last_update', None),
            "pending_changes": len(getattr(self.handler, 'pending_changes', [])),
            "intelligence_status": {
                "knowledge_base_exists": self.intelligence.knowledge_base_path.exists(),
                "site_map_exists": self.intelligence.site_map_path.exists(),
                "total_nodes": len(self.intelligence.nodes)
            }
        }
        
        return status


def create_update_script():
    """
    📜 Create a simple batch script for manual updates
    """
    script_content = '''@echo off
echo 🚀 Gateway AI Manual Update
echo.
python ai/gateway-intelligence-core.py
echo.
echo ✅ Manual update complete!
pause
'''
    
    script_path = Path("update-ai.bat")
    with open(script_path, 'w') as f:
        f.write(script_content)
    
    print(f"📜 Created manual update script: {script_path}")


if __name__ == "__main__":
    import sys
    
    # Get project root
    project_root = Path(__file__).parent.parent
    
    # Create manual update script
    os.chdir(project_root)
    create_update_script()
    
    # Parse command line arguments
    if len(sys.argv) > 1 and sys.argv[1] == "--status":
        # Show status only
        updater = GatewayAutoUpdater(str(project_root))
        status = updater.get_status()
        print("📊 Gateway Auto-Updater Status:")
        print(json.dumps(status, indent=2))
    else:
        # Start the auto-updater
        updater = GatewayAutoUpdater(str(project_root))
        updater.start()
